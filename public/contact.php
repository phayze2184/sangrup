<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

$configPath = findConfigPath();

if ($configPath === null) {
    jsonResponse(500, [
        'ok' => false,
        'message' => 'Lipsește fișierul de configurare SMTP.',
    ]);
}

$config = require $configPath;

if (!is_array($config)) {
    jsonResponse(500, [
        'ok' => false,
        'message' => 'Fișierul de configurare SMTP este invalid.',
    ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(405, [
        'ok' => false,
        'message' => 'Metodă neacceptată.',
    ]);
}

if (
    !isset($config['password']) ||
    strpos((string) $config['password'], 'REPLACE_WITH_') !== false
) {
    jsonResponse(500, [
        'ok' => false,
        'message' => 'SMTP nu este configurat încă pentru cPanel.',
    ]);
}

$name = sanitizeHeaderValue((string) ($_POST['name'] ?? ''));
$phone = sanitizeHeaderValue((string) ($_POST['phone'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$fromEmail = trim((string) ($config['from_email'] ?? $config['username'] ?? ''));
$fromName = sanitizeHeaderValue((string) ($config['from_name'] ?? ''));
$toEmail = trim((string) ($config['to_email'] ?? ''));

if ($name === '' || $phone === '' || $email === '' || $message === '') {
    jsonResponse(422, [
        'ok' => false,
        'message' => 'Completează toate câmpurile obligatorii.',
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(422, [
        'ok' => false,
        'message' => 'Te rugăm să introduci o adresă de email validă.',
    ]);
}

if (strlen($message) > 4000) {
    jsonResponse(422, [
        'ok' => false,
        'message' => 'Mesajul este prea lung.',
    ]);
}

if ($fromEmail === '' || $toEmail === '') {
    jsonResponse(500, [
        'ok' => false,
        'message' => 'Configurarea SMTP este incompletă.',
    ]);
}

$subject = 'Cerere de contact website - ' . $name;
$plainBody = implode("\r\n", [
    'Salut,',
    '',
    'Ai primit un mesaj nou de pe formularul site-ului.',
    '',
    'Nume: ' . $name,
    'Telefon: ' . $phone,
    'Email: ' . $email,
    '',
    'Mesaj:',
    $message,
]);

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = [
    'Date: ' . date(DATE_RFC2822),
    'From: ' . formatAddress($fromName, $fromEmail),
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$messageData = 'Subject: ' . $encodedSubject . "\r\n";
$messageData .= implode("\r\n", $headers);
$messageData .= "\r\n\r\n" . normalizeSmtpBody($plainBody);

try {
    smtpSendMail($config, $fromEmail, $toEmail, $messageData);

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Mesajul a fost trimis cu succes.',
    ]);
} catch (Throwable $exception) {
    error_log('SMTP contact form error: ' . $exception->getMessage());

    jsonResponse(500, [
        'ok' => false,
        'message' => 'Trimiterea a eșuat. Verifică setările SMTP.',
    ]);
}

function jsonResponse(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function findConfigPath(): ?string
{
    $candidates = [];

    $envPath = getenv('CONTACT_CONFIG_PATH');
    if (is_string($envPath) && trim($envPath) !== '') {
        $candidates[] = trim($envPath);
    }

    $candidates[] = dirname(__DIR__) . '/private/contact.config.php';
    $candidates[] = __DIR__ . '/contact.config.php';

    foreach ($candidates as $candidate) {
        if (is_file($candidate) && is_readable($candidate)) {
            return $candidate;
        }
    }

    return null;
}

function sanitizeHeaderValue(string $value): string
{
    $value = trim($value);

    return preg_replace('/[\r\n]+/', ' ', $value) ?? '';
}

function formatAddress(string $name, string $email): string
{
    $safeName = trim(preg_replace('/["\r\n]+/', ' ', $name) ?? '');

    if ($safeName === '') {
        return '<' . $email . '>';
    }

    return '"' . addcslashes($safeName, '"\\') . '" <' . $email . '>';
}

function normalizeSmtpBody(string $body): string
{
    $normalized = str_replace(["\r\n", "\r"], "\n", $body);
    $normalized = str_replace("\n", "\r\n", $normalized);

    return preg_replace('/(^|\r\n)\./', '$1..', $normalized) ?? $normalized;
}

function smtpSendMail(array $config, string $fromEmail, string $toEmail, string $messageData): void
{
    $host = (string) $config['host'];
    $port = (int) $config['port'];
    $security = (string) $config['security'];
    $timeout = (int) $config['timeout'];
    $remoteHost = $security === 'ssl' ? 'ssl://' . $host : $host;

    $socket = @stream_socket_client(
        $remoteHost . ':' . $port,
        $errorNumber,
        $errorMessage,
        $timeout
    );

    if (!is_resource($socket)) {
        throw new RuntimeException('Conexiunea SMTP a eșuat: ' . $errorMessage . ' (' . $errorNumber . ')');
    }

    stream_set_timeout($socket, $timeout);

    try {
        smtpExpect($socket, [220]);
        smtpCommand($socket, 'EHLO ' . smtpHelloName(), [250]);

        if ($security === 'tls') {
            smtpCommand($socket, 'STARTTLS', [220]);

            $cryptoEnabled = stream_socket_enable_crypto(
                $socket,
                true,
                STREAM_CRYPTO_METHOD_TLS_CLIENT
            );

            if ($cryptoEnabled !== true) {
                throw new RuntimeException('Negocierea TLS a eșuat.');
            }

            smtpCommand($socket, 'EHLO ' . smtpHelloName(), [250]);
        }

        if ((string) $config['username'] !== '') {
            smtpCommand($socket, 'AUTH LOGIN', [334]);
            smtpCommand($socket, base64_encode((string) $config['username']), [334]);
            smtpCommand($socket, base64_encode((string) $config['password']), [235]);
        }

        smtpCommand($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        smtpCommand($socket, 'RCPT TO:<' . $toEmail . '>', [250, 251]);
        smtpCommand($socket, 'DATA', [354]);

        smtpWrite($socket, $messageData . "\r\n.\r\n");
        smtpExpect($socket, [250]);

        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

function smtpCommand($socket, string $command, array $expectedCodes): string
{
    smtpWrite($socket, $command . "\r\n");

    return smtpExpect($socket, $expectedCodes);
}

function smtpWrite($socket, string $data): void
{
    $remaining = $data;

    while ($remaining !== '') {
        $written = fwrite($socket, $remaining);

        if ($written === false || $written === 0) {
            throw new RuntimeException('Nu s-a putut scrie către serverul SMTP.');
        }

        $remaining = substr($remaining, $written);
    }
}

function smtpExpect($socket, array $expectedCodes): string
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;

        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }

    $meta = stream_get_meta_data($socket);
    if (!empty($meta['timed_out'])) {
        throw new RuntimeException('Serverul SMTP nu a răspuns la timp.');
    }

    if ($response === '') {
        throw new RuntimeException('Răspuns SMTP invalid sau gol.');
    }

    $statusCode = (int) substr($response, 0, 3);

    if (!in_array($statusCode, $expectedCodes, true)) {
        throw new RuntimeException(trim($response));
    }

    return $response;
}

function smtpHelloName(): string
{
    $hostname = gethostname();

    if (is_string($hostname) && $hostname !== '') {
        return $hostname;
    }

    return 'localhost';
}
