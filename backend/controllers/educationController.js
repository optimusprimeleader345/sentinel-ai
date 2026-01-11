import EducationCourse from '../models/EducationCourse.js'

const mockTopics = [
  // ===== FOUNDATION MODULES =====
  {
    id: '1',
    title: 'Password Security Fundamentals',
    description: 'Master password creation, management, and advanced authentication methods.',
    category: 'foundations',
    difficulty: 'beginner',
    icon: '🔐',
    estimatedTime: '45 min',
    prerequisites: [],
    skills: ['Password Management', 'Authentication', 'Credential Security']
  },
  {
    id: '2',
    title: 'Phishing Attack Vectors',
    description: 'Comprehensive analysis of phishing techniques, detection, and prevention.',
    category: 'social-engineering',
    difficulty: 'beginner',
    icon: '🎣',
    estimatedTime: '60 min',
    prerequisites: [],
    skills: ['Email Security', 'Social Engineering', 'Threat Detection']
  },
  {
    id: '3',
    title: 'Malware Analysis & Defense',
    description: 'Deep dive into malware types, infection vectors, and remediation strategies.',
    category: 'malware',
    difficulty: 'intermediate',
    icon: '🦠',
    estimatedTime: '90 min',
    prerequisites: ['1'],
    skills: ['Malware Analysis', 'Endpoint Protection', 'Incident Response']
  },
  {
    id: '4',
    title: 'Network Security Architecture',
    description: 'Design and implement secure network infrastructures and defense strategies.',
    category: 'network',
    difficulty: 'intermediate',
    icon: '🌐',
    estimatedTime: '75 min',
    prerequisites: ['1'],
    skills: ['Network Design', 'Firewall Management', 'VPN Security']
  },

  // ===== ADVANCED THREAT MODULES =====
  {
    id: '5',
    title: 'Advanced Persistent Threats (APT)',
    description: 'Understanding nation-state level attacks and advanced threat actors.',
    category: 'advanced-threats',
    difficulty: 'advanced',
    icon: '🎯',
    estimatedTime: '120 min',
    prerequisites: ['3', '4'],
    skills: ['Threat Intelligence', 'APT Analysis', 'Advanced Forensics']
  },
  {
    id: '6',
    title: 'Zero Trust Security Model',
    description: 'Implement never-trust, always-verify security architectures.',
    category: 'architecture',
    difficulty: 'advanced',
    icon: '🛡️',
    estimatedTime: '90 min',
    prerequisites: ['4'],
    skills: ['Zero Trust', 'Identity Management', 'Micro-Segmentation']
  },
  {
    id: '7',
    title: 'Cryptography & Encryption',
    description: 'Master symmetric/asymmetric encryption, PKI, and quantum-resistant algorithms.',
    category: 'cryptography',
    difficulty: 'advanced',
    icon: '🔑',
    estimatedTime: '100 min',
    prerequisites: ['1'],
    skills: ['Public Key Infrastructure', 'Quantum Cryptography', 'Key Management']
  },
  {
    id: '8',
    title: 'Digital Forensics & Investigation',
    description: 'Conduct thorough digital investigations and evidence collection.',
    category: 'forensics',
    difficulty: 'advanced',
    icon: '🔬',
    estimatedTime: '110 min',
    prerequisites: ['3'],
    skills: ['Digital Forensics', 'Evidence Collection', 'Chain of Custody']
  },

  // ===== SPECIALIZED MODULES =====
  {
    id: '9',
    title: 'Cloud Security & DevSecOps',
    description: 'Secure cloud environments and integrate security into DevOps pipelines.',
    category: 'cloud',
    difficulty: 'intermediate',
    icon: '☁️',
    estimatedTime: '85 min',
    prerequisites: ['4'],
    skills: ['Cloud Security', 'DevSecOps', 'Container Security']
  },
  {
    id: '10',
    title: 'AI/ML Security & Adversarial Attacks',
    description: 'Protect AI systems from adversarial attacks and ensure ML security.',
    category: 'ai-security',
    difficulty: 'expert',
    icon: '🤖',
    estimatedTime: '130 min',
    prerequisites: ['5', '7'],
    skills: ['AI Security', 'Adversarial ML', 'Model Poisoning Defense']
  },
  {
    id: '11',
    title: 'IoT & Embedded Device Security',
    description: 'Secure Internet of Things devices and embedded systems.',
    category: 'iot',
    difficulty: 'intermediate',
    icon: '📱',
    estimatedTime: '70 min',
    prerequisites: ['4'],
    skills: ['IoT Security', 'Firmware Analysis', 'Embedded Systems']
  },
  {
    id: '12',
    title: 'Compliance & Regulatory Frameworks',
    description: 'Master GDPR, HIPAA, PCI-DSS, and other compliance requirements.',
    category: 'compliance',
    difficulty: 'intermediate',
    icon: '📋',
    estimatedTime: '80 min',
    prerequisites: ['1'],
    skills: ['Compliance Management', 'Risk Assessment', 'Audit Preparation']
  },

  // ===== EMERGING THREATS =====
  {
    id: '13',
    title: 'Ransomware Defense Strategies',
    description: 'Combat ransomware attacks with prevention, detection, and recovery.',
    category: 'ransomware',
    difficulty: 'intermediate',
    icon: '💰',
    estimatedTime: '95 min',
    prerequisites: ['3'],
    skills: ['Ransomware Prevention', 'Backup Security', 'Incident Recovery']
  },
  {
    id: '14',
    title: 'Supply Chain Security',
    description: 'Protect against SolarWinds-style supply chain attacks.',
    category: 'supply-chain',
    difficulty: 'advanced',
    icon: '🔗',
    estimatedTime: '100 min',
    prerequisites: ['5', '9'],
    skills: ['Supply Chain Risk', 'Third-Party Security', 'SBOM Analysis']
  },
  {
    id: '15',
    title: 'Deepfake Detection & Prevention',
    description: 'Identify and defend against AI-generated synthetic media attacks.',
    category: 'ai-threats',
    difficulty: 'advanced',
    icon: '🎭',
    estimatedTime: '85 min',
    prerequisites: ['2', '10'],
    skills: ['Deepfake Detection', 'Media Forensics', 'AI Content Analysis']
  },

  // ===== PRACTICAL SKILLS =====
  {
    id: '16',
    title: 'Penetration Testing Methodology',
    description: 'Learn ethical hacking techniques and penetration testing frameworks.',
    category: 'pentesting',
    difficulty: 'expert',
    icon: '⚡',
    estimatedTime: '150 min',
    prerequisites: ['5', '7', '8'],
    skills: ['Penetration Testing', 'Vulnerability Assessment', 'Exploit Development']
  },
  {
    id: '17',
    title: 'Security Operations Center (SOC)',
    description: 'Master SOC operations, threat hunting, and incident response.',
    category: 'soc',
    difficulty: 'advanced',
    icon: '🎛️',
    estimatedTime: '120 min',
    prerequisites: ['3', '4', '5'],
    skills: ['Threat Hunting', 'SIEM Management', 'Incident Response']
  },
  {
    id: '18',
    title: 'Blockchain & Crypto Security',
    description: 'Secure blockchain networks, wallets, and cryptocurrency systems.',
    category: 'blockchain',
    difficulty: 'advanced',
    icon: '⛓️',
    estimatedTime: '95 min',
    prerequisites: ['7'],
    skills: ['Blockchain Security', 'Smart Contract Auditing', 'Crypto Wallets']
  },

  // ===== MANAGEMENT & LEADERSHIP =====
  {
    id: '19',
    title: 'Cybersecurity Program Management',
    description: 'Build and manage comprehensive cybersecurity programs.',
    category: 'management',
    difficulty: 'expert',
    icon: '👔',
    estimatedTime: '140 min',
    prerequisites: ['6', '12', '17'],
    skills: ['Security Strategy', 'Risk Management', 'Team Leadership']
  },
  {
    id: '20',
    title: 'Cyber Insurance & Risk Transfer',
    description: 'Understand cyber insurance, risk assessment, and claims management.',
    category: 'risk-management',
    difficulty: 'intermediate',
    icon: '📊',
    estimatedTime: '70 min',
    prerequisites: ['12'],
    skills: ['Risk Assessment', 'Insurance Coverage', 'Claims Management']
  },

  // ===== EMERGENCY RESPONSE =====
  {
    id: '21',
    title: 'Cyber Crisis Management',
    description: 'Handle cyber incidents, breaches, and crisis communication.',
    category: 'crisis-management',
    difficulty: 'expert',
    icon: '🚨',
    estimatedTime: '110 min',
    prerequisites: ['5', '17', '19'],
    skills: ['Crisis Management', 'Stakeholder Communication', 'Business Continuity']
  },
  {
    id: '22',
    title: 'Digital Warfare & Cyber Espionage',
    description: 'Understanding state-sponsored cyber operations and defense.',
    category: 'cyber-warfare',
    difficulty: 'expert',
    icon: '⚔️',
    estimatedTime: '135 min',
    prerequisites: ['5', '14', '21'],
    skills: ['Cyber Warfare', 'Nation-State Threats', 'Strategic Defense']
  }
]

const mockLessons = [
  // ===== FOUNDATION LESSONS =====
  {
    id: '1',
    topicId: '1',
    title: 'Password Security Fundamentals',
    content: 'Master the essential principles of password security, from basic complexity requirements to advanced authentication methods. Understanding password security is the foundation of all digital protection.',
    keyPoints: [
      'Minimum 12-16 characters with mixed character types (uppercase, lowercase, numbers, symbols)',
      'Avoid dictionary words, personal information, and predictable patterns',
      'Use unique passwords for each account to prevent credential stuffing attacks',
      'Implement passphrase combinations for better memorability and security',
      'Regular password rotation and monitoring for breaches'
    ],
    examples: [
      'Weak: password123, qwerty, 123456',
      'Better: Tr@velThruT!me2024$ (14 chars, mixed types)',
      'Best: blue-horse-pixel-moon-delivers-message (passphrase)',
      'Enterprise: Use password managers like LastPass, Bitwarden, or 1Password'
    ],
    tips: [
      'Enable Multi-Factor Authentication (MFA) on all accounts',
      'Use password managers to generate and securely store complex passwords',
      'Change default passwords immediately on new devices/services',
      'Monitor for data breaches using services like HaveIBeenPwned',
      'Implement password policies in organizational settings'
    ]
  },
  {
    id: '2',
    topicId: '1',
    title: 'Advanced Authentication Methods',
    content: 'Explore modern authentication beyond passwords, including biometrics, hardware tokens, and passwordless solutions.',
    keyPoints: [
      'Biometric authentication (fingerprint, facial recognition, voice)',
      'Hardware security keys (YubiKey, Titan Security Key)',
      'Certificate-based authentication and smart cards',
      'Passwordless authentication using FIDO2/WebAuthn',
      'Risk-based authentication and adaptive access controls'
    ],
    examples: [
      'Hardware Keys: YubiKey for GitHub, Google, Microsoft accounts',
      'Biometrics: Windows Hello, Apple Touch ID/Face ID',
      'Certificate Auth: Government PIV cards, enterprise smart cards',
      'Passwordless: Microsoft Authenticator, Google Prompt'
    ],
    tips: [
      'Combine multiple authentication factors (something you know + have + are)',
      'Use hardware keys for high-value accounts',
      'Enable biometric authentication where available',
      'Regularly update authentication applications and devices',
      'Train users on proper authentication hygiene'
    ]
  },
  {
    id: '3',
    topicId: '2',
    title: 'Email Phishing Attack Vectors',
    content: 'Comprehensive analysis of email-based phishing attacks, from basic scams to sophisticated spear-phishing campaigns targeting specific individuals.',
    keyPoints: [
      'Generic phishing: Mass emails with malicious links or attachments',
      'Spear-phishing: Targeted attacks using personal information',
      'Whaling: High-level executive targeting',
      'Business Email Compromise (BEC): Impersonating executives for wire transfers',
      'Pharming: DNS poisoning to redirect legitimate URLs'
    ],
    examples: [
      'Generic: "Your package is delayed - click here to track"',
      'Spear-phishing: "John, here\'s the Q4 report you requested"',
      'BEC: "Wire $50K to this vendor immediately - CEO approval"',
      'Malicious attachments: Fake invoices with embedded malware'
    ],
    tips: [
      'Never click links in unexpected emails - type URLs manually',
      'Verify sender email addresses and check for spoofing',
      'Hover over links to preview actual destinations',
      'Enable email filtering and anti-phishing features',
      'Report suspicious emails to security teams immediately'
    ]
  },
  {
    id: '4',
    topicId: '2',
    title: 'Social Engineering & Vishing Attacks',
    content: 'Understanding voice-based attacks (vishing), SMS phishing (smishing), and advanced social engineering techniques that exploit human psychology.',
    keyPoints: [
      'Vishing: Voice phishing via phone calls impersonating trusted entities',
      'Smishing: SMS phishing with malicious links or fake alerts',
      'Pretexting: Creating fabricated scenarios to extract information',
      'Baiting: Offering something enticing to trick users into compromising security',
      'Tailgating/Piggybacking: Physical social engineering in secure facilities'
    ],
    examples: [
      'Vishing: "This is Microsoft support - your computer has a virus"',
      'Smishing: "Your bank account is suspended - verify now"',
      'Pretexting: Posing as IT support to request password resets',
      'Baiting: USB drives labeled "Q4 Bonuses" left in parking lots'
    ],
    tips: [
      'Verify caller ID and ask for callback numbers from official sources',
      'Never share sensitive information over unsolicited calls',
      'Enable SMS filtering and avoid clicking SMS links',
      'Implement clear verification procedures for sensitive requests',
      'Train employees on social engineering awareness'
    ]
  },

  // ===== MALWARE ANALYSIS =====
  {
    id: '5',
    topicId: '3',
    title: 'Malware Classification & Types',
    content: 'Comprehensive overview of malware families, from traditional viruses to modern advanced persistent threats and fileless malware.',
    keyPoints: [
      'Viruses: Self-replicating code that infects other files',
      'Worms: Self-spreading malware that exploits network vulnerabilities',
      'Trojan Horses: Malicious software disguised as legitimate applications',
      'Ransomware: Encrypts files and demands payment for decryption',
      'Spyware/Keyloggers: Secretly monitors and captures user activity'
    ],
    examples: [
      'Virus: Stuxnet (targeted SCADA systems in Iran nuclear program)',
      'Worm: WannaCry (exploited EternalBlue vulnerability globally)',
      'Trojan: Emotet (banking trojan with botnet capabilities)',
      'Ransomware: Ryuk (targeted enterprises with double extortion)',
      'Rootkit: Sony BMG (hidden malware on music CDs)'
    ],
    tips: [
      'Install reputable antivirus software and keep it updated',
      'Enable real-time scanning and behavioral analysis',
      'Avoid opening unknown email attachments',
      'Keep operating systems and applications patched',
      'Use application whitelisting and sandboxing technologies'
    ]
  },
  {
    id: '6',
    topicId: '3',
    title: 'Advanced Malware Techniques',
    content: 'Explore sophisticated malware techniques including rootkits, bootkits, fileless malware, and living-off-the-land attacks.',
    keyPoints: [
      'Rootkits: Hide malware presence by modifying system components',
      'Bootkits: Infect master boot record for persistence before OS loads',
      'Fileless Malware: Resides in memory without touching disk',
      'Living-off-the-Land: Uses legitimate system tools for malicious purposes',
      'Polymorphic Malware: Changes appearance to evade signature detection'
    ],
    examples: [
      'Rootkit: Hacker Defender (user-mode rootkit for Windows)',
      'Bootkit: Rovnix (MBR rootkit with network capabilities)',
      'Fileless: Poweliks (registry-based fileless malware)',
      'LotL: PowerShell Empire (uses PowerShell for post-exploitation)',
      'Polymorphic: Virut (virus that changes signatures with each infection)'
    ],
    tips: [
      'Implement Endpoint Detection and Response (EDR) solutions',
      'Monitor system integrity and unusual process behaviors',
      'Use memory scanning and behavioral analysis',
      'Implement application control and script blocking',
      'Regular forensic analysis and threat hunting'
    ]
  },

  // ===== NETWORK SECURITY =====
  {
    id: '7',
    topicId: '4',
    title: 'Network Defense Fundamentals',
    content: 'Master network security architecture, including firewalls, IDS/IPS, VPNs, and secure network design principles.',
    keyPoints: [
      'Defense in Depth: Multiple security layers for comprehensive protection',
      'Network Segmentation: Isolating critical systems and data',
      'Access Control Lists (ACLs): Controlling traffic flow and permissions',
      'Network Address Translation (NAT): Hiding internal network structure',
      'Virtual Local Area Networks (VLANs): Logical network separation'
    ],
    examples: [
      'Firewall Rules: Block inbound traffic except essential services',
      'IDS/IPS: Snort rules for detecting SQL injection attempts',
      'VPN: OpenVPN for secure remote access to corporate networks',
      'Zero Trust: Google BeyondCorp model implementation',
      'SDN: Software-defined networking for dynamic security policies'
    ],
    tips: [
      'Implement next-generation firewalls with application awareness',
      'Use network monitoring and traffic analysis tools',
      'Regular network vulnerability assessments and penetration testing',
      'Implement network access control (NAC) solutions',
      'Monitor for unusual traffic patterns and lateral movement'
    ]
  },
  {
    id: '8',
    topicId: '4',
    title: 'Wireless Network Security',
    content: 'Secure wireless networks against eavesdropping, rogue access points, and wireless-specific attacks.',
    keyPoints: [
      'WPA3: Latest Wi-Fi security protocol with improved encryption',
      'Rogue Access Point Detection: Identifying unauthorized wireless devices',
      'Wireless Intrusion Detection Systems (WIDS): Monitoring wireless traffic',
      'Evil Twin Attacks: Fake access points impersonating legitimate networks',
      'Wireless Encryption: WPA2 vs WPA3 vs WEP vulnerabilities'
    ],
    examples: [
      'Evil Twin: Fake "Free WiFi" hotspot capturing credentials',
      'Deauthentication Attacks: Forcing clients to disconnect for man-in-the-middle',
      'KRACK Attack: Exploiting WPA2 four-way handshake vulnerability',
      'Pineapple Devices: Hak5 WiFi Pineapple for wireless penetration testing',
      'WPS Attacks: Brute force attacks on Wi-Fi Protected Setup'
    ],
    tips: [
      'Use WPA3 encryption on all wireless networks',
      'Disable WPS and UPnP on wireless routers',
      'Implement wireless guest networks with isolation',
      'Regular wireless site surveys and rogue AP detection',
      'Monitor for deauthentication and disassociation attacks'
    ]
  },

  // ===== ADVANCED THREATS =====
  {
    id: '9',
    topicId: '5',
    title: 'APT Lifecycle & Operations',
    content: 'Understanding Advanced Persistent Threats: how nation-state actors infiltrate, maintain access, and exfiltrate data over extended periods.',
    keyPoints: [
      'Reconnaissance: Intelligence gathering and target identification',
      'Initial Access: Gaining first foothold through various vectors',
      'Persistence: Maintaining access despite defensive measures',
      'Privilege Escalation: Gaining higher-level access rights',
      'Internal Movement: Lateral movement within the compromised network'
    ],
    examples: [
      'APT28/Fancy Bear: Russian military intelligence operations',
      'APT41: Chinese state-sponsored espionage and crime syndicate',
      'Equation Group/NSA: Advanced cyber operations capabilities',
      'SolarWinds Supply Chain Attack: Compromising trusted software updates',
      'WannaCry: Exploiting Windows vulnerabilities for global ransomware'
    ],
    tips: [
      'Implement advanced threat detection and hunting capabilities',
      'Regular security assessments and red team exercises',
      'Deploy endpoint detection and response (EDR) platforms',
      'Monitor for command and control (C2) communications',
      'Implement network segmentation and zero trust principles'
    ]
  },
  {
    id: '10',
    topicId: '5',
    title: 'APT Detection & Response',
    content: 'Advanced techniques for detecting, analyzing, and responding to sophisticated threat actors in your environment.',
    keyPoints: [
      'Anomaly Detection: Identifying unusual network and system behaviors',
      'Threat Intelligence Integration: Using external threat feeds for context',
      'Memory Forensics: Analyzing volatile memory for stealthy malware',
      'Network Traffic Analysis: Detecting C2 communications and data exfiltration',
      'Digital Forensics: Preserving evidence for attribution and analysis'
    ],
    examples: [
      'Memory Analysis: Volatility framework for memory forensics',
      'Traffic Analysis: Zeek (formerly Bro) for network monitoring',
      'Threat Hunting: Manual investigation using hypothesis-driven approach',
      'IOC Matching: Indicators of Compromise from threat intelligence',
      'Behavioral Analysis: Machine learning for anomaly detection'
    ],
    tips: [
      'Build a dedicated threat hunting team or capability',
      'Implement Security Information and Event Management (SIEM)',
      'Regular incident response drills and tabletop exercises',
      'Establish relationships with threat intelligence sharing communities',
      'Maintain detailed logging and audit trails for forensic analysis'
    ]
  },

  // ===== ZERO TRUST =====
  {
    id: '11',
    topicId: '6',
    title: 'Zero Trust Architecture Principles',
    content: 'Implement the core principles of Zero Trust security: never trust, always verify, regardless of network location.',
    keyPoints: [
      'Identity Verification: Strong authentication for all users and devices',
      'Device Health Checks: Continuous validation of device security posture',
      'Micro-Segmentation: Granular access controls at the workload level',
      'Least Privilege Access: Minimal permissions required for tasks',
      'Continuous Monitoring: Real-time security validation and response'
    ],
    examples: [
      'Google BeyondCorp: Zero trust implementation at scale',
      'Microsoft Zero Trust: Identity-driven security model',
      'Okta Identity Cloud: Comprehensive identity and access management',
      'Cisco Zero Trust: Network-centric zero trust architecture',
      'Cloudflare Access: Application-level zero trust security'
    ],
    tips: [
      'Start with identity and access management foundation',
      'Implement network micro-segmentation progressively',
      'Use policy-based access controls instead of perimeter security',
      'Enable continuous authentication and authorization',
      'Monitor and log all access attempts and security events'
    ]
  },

  // ===== CRYPTOGRAPHY =====
  {
    id: '12',
    topicId: '7',
    title: 'Public Key Infrastructure & Certificates',
    content: 'Master PKI fundamentals, certificate authorities, certificate lifecycle management, and secure key distribution.',
    keyPoints: [
      'Certificate Authorities (CA): Trusted entities issuing digital certificates',
      'Certificate Revocation: CRL and OCSP for invalidating compromised certificates',
      'Key Management: Secure generation, storage, and rotation of cryptographic keys',
      'Certificate Pinning: Preventing man-in-the-middle attacks with expected certificates',
      'Hardware Security Modules (HSM): Dedicated hardware for key management'
    ],
    examples: [
      'SSL/TLS Certificates: HTTPS website certificates from DigiCert, Let\'s Encrypt',
      'Code Signing Certificates: Authenticode for Windows executables',
      'S/MIME Certificates: Email encryption and digital signatures',
      'Client Certificates: Mutual TLS authentication',
      'HSM: AWS CloudHSM, Azure Dedicated HSM'
    ],
    tips: [
      'Use certificate transparency logs to monitor certificate issuance',
      'Implement certificate pinning in mobile applications',
      'Regular certificate inventory and expiration monitoring',
      'Use hardware security modules for high-value key management',
      'Implement proper certificate lifecycle management processes'
    ]
  },

  // ===== FORENSICS =====
  {
    id: '13',
    topicId: '8',
    title: 'Digital Evidence Collection',
    content: 'Learn proper procedures for collecting, preserving, and analyzing digital evidence while maintaining chain of custody.',
    keyPoints: [
      'Chain of Custody: Documenting evidence handling from collection to presentation',
      'Write Protection: Using write-blockers to prevent evidence alteration',
      'Hashing: Creating cryptographic hashes for evidence integrity verification',
      'Documentation: Detailed notes on collection procedures and findings',
      'Legal Considerations: Understanding warrants, privacy laws, and admissibility'
    ],
    examples: [
      'Disk Imaging: Creating forensic copies with tools like FTK Imager',
      'Memory Acquisition: Capturing RAM contents with Volatility or Rekall',
      'Network Packet Capture: Using Wireshark for traffic analysis',
      'Mobile Device Forensics: Cellebrite UFED for mobile evidence',
      'Cloud Forensics: AWS, Azure, and GCP evidence collection procedures'
    ],
    tips: [
      'Use industry-standard forensic tools and procedures',
      'Maintain detailed documentation throughout the investigation',
      'Follow legal requirements for evidence collection and preservation',
      'Work with legal counsel for complex investigations',
      'Implement proper evidence storage and retention policies'
    ]
  },

  // ===== CLOUD SECURITY =====
  {
    id: '14',
    topicId: '9',
    title: 'Cloud Security Best Practices',
    content: 'Secure cloud environments with shared responsibility model, identity management, and infrastructure protection.',
    keyPoints: [
      'Shared Responsibility: Understanding cloud provider vs customer responsibilities',
      'Identity and Access Management (IAM): Least privilege in cloud environments',
      'Data Encryption: At rest and in transit encryption strategies',
      'Network Security: Security groups, VPC design, and traffic protection',
      'Monitoring and Logging: CloudTrail, CloudWatch, and security monitoring'
    ],
    examples: [
      'AWS Security: IAM roles, Security Groups, VPC configurations',
      'Azure Security: Azure AD, NSGs, Azure Monitor and Log Analytics',
      'GCP Security: IAM, VPC networks, Cloud Logging and Monitoring',
      'Container Security: Docker image scanning, Kubernetes security',
      'Serverless Security: Lambda function security, API Gateway protection'
    ],
    tips: [
      'Implement least privilege access across all cloud resources',
      'Use cloud-native security services and tools',
      'Regular security assessments and penetration testing',
      'Implement comprehensive monitoring and alerting',
      'Follow cloud security frameworks like CIS Benchmarks'
    ]
  },

  // ===== AI/ML SECURITY =====
  {
    id: '15',
    topicId: '10',
    title: 'AI System Vulnerabilities',
    content: 'Understanding security risks in AI and machine learning systems, from adversarial attacks to model poisoning.',
    keyPoints: [
      'Adversarial Attacks: Small perturbations causing misclassification',
      'Model Poisoning: Training data manipulation to corrupt model behavior',
      'Model Inversion: Extracting training data from model outputs',
      'Membership Inference: Determining if data was used in training',
      'Backdoor Attacks: Hidden triggers causing unexpected behavior'
    ],
    examples: [
      'Adversarial Images: Panda → Gibbon with imperceptible pixel changes',
      'Model Poisoning: Targeted attacks on autonomous vehicle classifiers',
      'Deepfake Detection Evasion: Adversarial examples fooling detectors',
      'Prompt Injection: Manipulating LLM behavior through crafted inputs',
      'Data Poisoning: Corrupting training datasets with malicious samples'
    ],
    tips: [
      'Implement adversarial training and robust model architectures',
      'Use differential privacy techniques for training data protection',
      'Regular security testing of AI systems and models',
      'Monitor for unusual model behavior and performance degradation',
      'Implement access controls and audit trails for AI systems'
    ]
  }
]

const mockVideos = [
  {
    id: '1',
    title: 'Cybersecurity Basics for Everyone',
    description: 'A comprehensive introduction to cybersecurity fundamentals.',
    thumbnail: '/api/placeholder/300/200',
    duration: '15:30',
    topic: 'Password Security'
  },
  {
    id: '2',
    title: 'Spotting Phishing Attacks',
    description: 'Learn to identify and avoid dangerous phishing attempts.',
    thumbnail: '/api/placeholder/300/200',
    duration: '12:45',
    topic: 'Phishing Awareness'
  },
  {
    id: '3',
    title: 'Social Engineering Tactics Exposed',
    description: 'Understanding how attackers manipulate human psychology.',
    thumbnail: '/api/placeholder/300/200',
    duration: '20:15',
    topic: 'Social Engineering'
  },
  {
    id: '4',
    title: 'Malware Types and Prevention',
    description: 'Explore different malware types and protection strategies.',
    thumbnail: '/api/placeholder/300/200',
    duration: '18:20',
    topic: 'Malware Basics'
  }
]

const mockQuizzes = [
  {
    id: '1',
    topicId: '1',
    title: 'Password Security Quiz',
    questions: [
      {
        id: '1',
        question: 'What is the minimum recommended length for a strong password?',
        options: ['8 characters', '12 characters', '16 characters', '20 characters'],
        correctAnswer: '12 characters',
        explanation: 'Modern security standards recommend at least 12 characters for adequate protection.'
      },
      {
        id: '2',
        question: 'Which of these is considered a weak password pattern?',
        options: ['Dictionary words', 'Random character combinations', 'Passphrases', 'All of the above'],
        correctAnswer: 'Dictionary words',
        explanation: 'Dictionary words and common patterns are easily guessed by attackers.'
      },
      {
        id: '3',
        question: 'What should you do if a service has been breached?',
        options: ['Ignore it', 'Change password only on that service', 'Change passwords everywhere', 'Delete your account'],
        correctAnswer: 'Change passwords everywhere',
        explanation: 'Credential stuffing attacks often target multiple services after a breach.'
      },
      {
        id: '4',
        question: 'Which authentication method provides the most security?',
        options: ['Password only', 'Password + SMS code', 'Password + Authenticator app', 'Password + Email verification'],
        correctAnswer: 'Password + Authenticator app',
        explanation: 'Authenticator apps use time-based codes that are more secure than SMS or email.'
      },
      {
        id: '5',
        question: 'What is the best way to manage multiple strong passwords?',
        options: ['Write them down', 'Use the same password everywhere', 'Use a password manager', 'Memorize them all'],
        correctAnswer: 'Use a password manager',
        explanation: 'Password managers can generate and securely store unique passwords for all accounts.'
      }
    ]
  },
  {
    id: '2',
    topicId: '2',
    title: 'Phishing Awareness Quiz',
    questions: [
      {
        id: '1',
        question: 'What is the most common method attackers use for phishing?',
        options: ['Phone calls', 'Email', 'In-person visits', 'Social media posts'],
        correctAnswer: 'Email',
        explanation: 'Email remains the most prevalent phishing vector due to its scale and reach.'
      },
      {
        id: '2',
        question: 'What should you do if you suspect an email is a phishing attempt?',
        options: ['Click the link to investigate', 'Reply asking for more information', 'Report it to your security team', 'Forward it to friends'],
        correctAnswer: 'Report it to your security team',
        explanation: 'Reporting suspicious emails helps security teams track and block phishing campaigns.'
      },
      {
        id: '3',
        question: 'Which of these is NOT a common phishing tactic?',
        options: ['Urgency pressure', 'Personal information requests', 'System update notifications', 'Password complexity requirements'],
        correctAnswer: 'Password complexity requirements',
        explanation: 'Legitimate companies won\'t ask for passwords via email or unexpected communications.'
      },
      {
        id: '4',
        question: 'What is "smishing"?',
        options: ['Email phishing', 'Phone phishing', 'SMS phishing', 'Website phishing'],
        correctAnswer: 'SMS phishing',
        explanation: 'Smishing is phishing conducted via SMS/text messages.'
      },
      {
        id: '5',
        question: 'How can you verify a suspicious email claims to be from your bank?',
        options: ['Call the phone number in the email', 'Click the link and log in', 'Search for the bank\'s official contact info online', 'Reply to the email'],
        correctAnswer: 'Search for the bank\'s official contact info online',
        explanation: 'Always use independently verified contact information to avoid caller ID spoofing.'
      }
    ]
  }
]

const mockProgress = [
  {
    topicId: '1',
    topicName: 'Password Security',
    progress: 65,
    completedLessons: 2,
    totalLessons: 3,
    quizScore: 80,
    lastActivity: '2024-01-15T10:30:00Z'
  },
  {
    topicId: '2',
    topicName: 'Phishing Awareness',
    progress: 40,
    completedLessons: 1,
    totalLessons: 3,
    quizScore: null,
    lastActivity: '2024-01-14T14:20:00Z'
  },
  {
    topicId: '3',
    topicName: 'Social Engineering',
    progress: 0,
    completedLessons: 0,
    totalLessons: 3,
    quizScore: null,
    lastActivity: null
  }
]

const mockTips = [
  'Always use strong, unique passwords for each account',
  'Enable two-factor authentication whenever possible',
  'Be cautious of suspicious emails and links',
  'Keep your software and operating system updated',
  'Use a reputable antivirus and keep it updated',
  'Avoid using public Wi-Fi for sensitive transactions',
  'Regularly back up your important data',
  'Be wary of social engineering attacks',
]

export const getCourses = async (req, res) => {
  try {
    const courses = await EducationCourse.find().sort({ createdAt: -1 })

    if (courses.length === 0) {
      return res.json(mockCourses)
    }

    res.json(courses)
  } catch (error) {
    console.error('Get courses error:', error)
    res.status(500).json({ message: 'Server error fetching courses' })
  }
}

export const getTips = async (req, res) => {
  try {
    // Return random tip
    const randomTip = mockTips[Math.floor(Math.random() * mockTips.length)]
    
    res.json({
      tip: randomTip,
      date: new Date().toISOString().split('T')[0],
    })
  } catch (error) {
    console.error('Get tips error:', error)
    res.status(500).json({ message: 'Server error fetching tips' })
  }
}

export const getTopics = async (req, res) => {
  try {
    res.json(mockTopics)
  } catch (error) {
    console.error('Get topics error:', error)
    res.status(500).json({ message: 'Server error fetching topics' })
  }
}

export const getLessons = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'Topic ID is required' })
    }

    const lesson = mockLessons.find(l => l.topicId === id)
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found for this topic' })
    }

    res.json(lesson)
  } catch (error) {
    console.error('Get lessons error:', error)
    res.status(500).json({ message: 'Server error fetching lesson' })
  }
}

export const getVideos = async (req, res) => {
  try {
    res.json(mockVideos)
  } catch (error) {
    console.error('Get videos error:', error)
    res.status(500).json({ message: 'Server error fetching videos' })
  }
}

export const getQuiz = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'Topic ID is required' })
    }

    const quiz = mockQuizzes.find(q => q.topicId === id)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this topic' })
    }

    // Return quiz without correct answers for the frontend
    const quizForFrontend = {
      ...quiz,
      questions: quiz.questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
      }))
    }

    res.json(quizForFrontend)
  } catch (error) {
    console.error('Get quiz error:', error)
    res.status(500).json({ message: 'Server error fetching quiz' })
  }
}

export const getProgress = async (req, res) => {
  try {
    res.json(mockProgress)
  } catch (error) {
    console.error('Get progress error:', error)
    res.status(500).json({ message: 'Server error fetching progress' })
  }
}

export const submitQuiz = async (req, res) => {
  try {
    const { topicId, answers } = req.body

    if (!topicId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Topic ID and answers array are required' })
    }

    // Get the quiz to check answers
    const quiz = mockQuizzes.find(q => q.topicId === topicId)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    // Calculate score by checking answers against correct ones
    let correctAnswers = 0
    const results = answers.map((answer, index) => {
      const question = quiz.questions[index]
      const isCorrect = answer === question.correctAnswer
      if (isCorrect) correctAnswers++
      return {
        questionId: question.id,
        selectedAnswer: answer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      }
    })

    const totalQuestions = quiz.questions.length
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    res.json({
      topicId,
      score,
      correctAnswers,
      totalQuestions,
      passed: score >= 70,
      results,
      feedback: score >= 70
        ? 'Excellent! You have mastered this topic.'
        : 'Keep learning! Review the material and try again.',
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    res.status(500).json({ message: 'Server error processing quiz' })
  }
}
