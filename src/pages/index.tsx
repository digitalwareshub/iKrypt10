import { 
  LockClosedIcon, 
  DocumentTextIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  QrCodeIcon,
  ClipboardDocumentIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
  ArrowUpTrayIcon,
  FingerPrintIcon
} from '@heroicons/react/24/outline';
import { ToolCard } from '../components/ToolCard';

const tools = [
  {
    title: 'Encrypt Paste',
    description: 'Securely encrypt text and share via link',
    icon: LockClosedIcon,
    to: '/encrypt-paste'
  },
  {
    title: 'File Drop',
    description: 'Upload and encrypt files for secure sharing',
    icon: ArrowUpTrayIcon,
    to: '/file-drop'
  },
  {
    title: 'Secure Notes',
    description: 'Local encrypted notepad',
    icon: DocumentTextIcon,
    to: '/notes'
  },
  {
    title: 'Encrypted Mail',
    description: 'Write and encrypt email drafts',
    icon: EnvelopeIcon,
    to: '/mail'
  },
  {
    title: 'One-Time Messages',
    description: 'Send self-destructing encrypted messages',
    icon: DocumentDuplicateIcon,
    to: '/one-time'
  },
  {
    title: 'QR Encrypt',
    description: 'Generate encrypted QR codes',
    icon: QrCodeIcon,
    to: '/qr'
  },
  {
    title: 'Secure Chat',
    description: 'P2P encrypted real-time chat',
    icon: ChatBubbleLeftRightIcon,
    to: '/chat'
  },
  {
    title: 'Secure Clipboard',
    description: 'Encrypt text in your clipboard',
    icon: ClipboardDocumentIcon,
    to: '/clipboard'
  },
  {
    title: 'Encrypt Copy',
    description: 'Type, encrypt, and copy to clipboard',
    icon: PencilSquareIcon,
    to: '/encrypt-copy'
  },
  {
    title: 'Digital Sign',
    description: 'Digitally sign messages with ECDSA',
    icon: FingerPrintIcon,
    to: '/sign'
  }
];

export default function HomePage() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          iKrypt Privacy Toolbox
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Simple, secure, browser-based privacy tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.to} {...tool} />
        ))}
      </div>
    </div>
  );
}