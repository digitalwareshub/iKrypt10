import { Link } from 'react-router-dom';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  to: string;
}

export const ToolCard = ({ title, description, icon: Icon, to }: ToolCardProps) => {
  return (
    <Link
      to={to}
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-primary-600 dark:text-primary-500" />
        <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Link>
  );
};