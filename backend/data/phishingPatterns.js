// Phishing Detection Patterns Database
// Based on research and common phishing indicators

export const PHISHING_KEYWORDS = [
  // Login/Theft Keywords
  'login', 'sign in', 'signin', 'log in', 'signin to', 'verify account',
  'account verification', 'secure login', 'password reset', 'reset password',
  'change password', 'password recovery', 'account blocked', 'security alert',

  // Financial Keywords
  'bank account', 'bank login', 'bank verification', 'online banking', 'net banking',
  'account details', 'personal details', 'credit card', 'debit card', 'card details',
  'payment confirmation', 'transaction alert', 'bank transfer', 'wire transfer',
  'paypal login', 'paypal account', 'apple pay', 'google pay', 'venmo',

  // Trust/Security Keywords
  'verify', 'verification', 'confirm', 'confirmation', 'authenticate', 'authentication',
  'security update', 'critical alert', 'account suspended', 'account locked',
  'immediately', 'urgent action', 'emergency access', 'limited time', 'expiring soon',

  // Service/Tech Keywords
  'microsoft alert', 'google security', 'apple security', 'facebook security',
  'instagram security', 'twitter security', 'linkedin security', 'amazon alert',
  'netflix issue', 'spotify problem', 'dropbox error', 'onedrive alert', 'icloud issue',

  // Common Phishing Phrases
  'update your information', 'confirm your identity', 'your account has been',
  'please verify', 'action required', 'important notice', 'security breach',
  'unauthorized access', 'suspicious activity', 'complete verification'
];

export const SUSPICIOUS_FORM_PATTERNS = [
  // Form Field Names
  'user_id', 'userId', 'userid', 'login_id', 'loginId', 'user_name', 'username',
  'user_name', 'pass', 'passwd', 'password', 'pass_word', 'pwd', 'pin',
  'pincode', 'card_number', 'cardNumber', 'card_num', 'cc_number', 'ccnumber',
  'credit_card', 'debit_card', 'cvv', 'cvc', 'security_code', 'ssn', 'social_security',
  'phone_number', 'mobile', 'email_id', 'mail', 'account_no', 'account_number',

  // Hidden Fields
  'hidden_user', 'hidden_pass', 'hidden_form', 'submit_data', 'form_data',

  // Fake Fields
  'username_', 'password_', 'email_', 'login_', 'hidden_script', 'auto_submit'
];

export const MALICIOUS_HTML_SIGNATURES = [
  // Script Injections
  '<script.*(?:eval|execute|setTimeout).*function.*</script>',
  '<iframe.*(?:src=["\'][^"\'"]*["\']).*style="display:none"',
  '<div.*(?:onload|onclick).*=.*(?:location|window\.location)',
  '<form.*action=["\'][^"\'"]*(?:\.(?:php|jsp|asp|exe|bat|cmd))',

  // Hidden Elements
  '<input.*type=["\']hidden["\'].*name=["\'](password|pwd|pass)["\']',
  '<input.*type=["\']password["\'].*style=["\']display:none["\']',

  // Auto-submit Forms
  '<form.*autocomplete.*off.*onsubmit.*return.*true',
  '<script.*document\.forms\[.*\]\.submit\(\)',

  // Phishing Redirects
  'window\.location\.href.*(?:http|https):\/\/(?:[^\/]+\.)*[a-z]+\.[a-z]+',
  'location\.replace.*(?:http|https):\/\/',

  // Fake Branding
  '<link.*rel="icon".*href="[^"]*\.(php|jsp|asp)[^"]*"',
  '<logo.*src="[^"]*\.(php|jsp|asp)[^"]*"'
];

export const TYPOSQUATTING_DOMAINS = [
  'g00gle', 'g0ogle', 'googlee', 'goog1e', 'g00g1e', 'gugle',
  'g00gle-com', 'goog1e-c0m', 'g00gle-com', 'google|-com',
  'facebookk', 'faceb00k', 'faceboook', 'faacebook', 'facebok',
  'netfl1x', 'netflix-com', 'netfl1x-com', 'netflixx', 'net-filx',
  'paypa1', 'paypal-c0m', 'pypal', 'paypal-com', 'pay-pal',
  'amaz0n', 'amazon-com', 'amzzon', 'amaz0n-com', 'amazonn',
  'bank0famerica', 'b0fa', 'bankofamreica', 'bofa-com', 'bofamerica'
];

export const PHISHING_WEBCAM_KEYWORDS = [
  'webcam', 'camera access', 'allow camera', 'camera permission',
  'enable webcam', 'camera required', 'video access', 'microphone access'
];

export const PHISHING_RED_FLAG_DOMAINS = [
  // Free hosting often used for phishing
  '000webhost.com', 'freehost.com', 'byethost.com', 'infinitefree',
  'awardspace.com', 't15.org', '110mb.com', 'esmartstart.com',

  // File hosting
  'drive.google.com', 'dropbox.com', 'onedrive.live.com', 'mediafire.com',

  // Shorteners
  'bit.ly', 'tinyurl.com', 'is.gd', 't.co', 'goo.gl', 'buff.ly',

  // Suspicious TLDs (more common in phishing)
  '.tk', '.ml', '.ga', '.cf', '.gq', '.eu', '.top', '.pro', '.club',
  '.work', '.online', '.xyz', '.space', '.website', '.site', '.biz',

  // IP-based domains (highly suspicious)
  /^(?:\d{1,3}\.){3}\d{1,3}$/
];

export const LEGITIMATE_DOMAINS = [
  // Major banks and financial institutions
  'chase.com', 'bankofamerica.com', 'wellsfargo.com', 'capitalone.com',
  'citigroup.com', 'paypal.com', 'stripe.com', 'squareup.com',
  'intuit.com', 'adobe.com', 'microsoft.com', 'apple.com', 'google.com',
  'facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com',
  'amazon.com', 'netflix.com', 'spotify.com', 'dropbox.com',
  'slack.com', 'zoom.us', 'discord.com'
];

export const FORM_ANALYSIS_WEIGHTS = {
  // Field combinations that indicate potential phishing
  'email+password': 30,
  'username+password': 25,
  'login+pass': 25,
  'email+otp+password': 35,
  'account+password+ssn': 50,
  'credit_card+expiry+cvc': 45,

  // Single suspicious fields
  'ssn': 20,
  'social_security': 20,
  'credit_card': 25,
  'debit_card': 25,
  'cvv': 20,
  'cvc': 20,
  'bank_account': 30,

  // Hidden suspicious fields
  'hidden_password': 35,
  'hidden_login': 30,
  'auto_submit': 40,
  'iframe_load': 25
};
