
import { ReactNode } from "react";

type RequirementProps = {
  icon: string | ReactNode;
  description?: string;
  iconColor?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
};

export default function Requirement({ 
  icon, 
  description, 
  iconColor = "#14AE5C", 
  bgColor = "bg-gray-100",
  textColor = "text-gray-800",
  className = "" 
}: RequirementProps) {
  return (
    <div className={`flex items-center justify-center p-8 ${bgColor} rounded-lg shadow-md ${className}`}>
      <div className="w-12 h-12 flex-shrink-0 mr-4">
        {typeof icon === 'string' ? (
          // Se l'icona è una stringa SVG
          <div 
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: icon.replace(/fill="[^"]*"/, `fill="${iconColor}"`) }}
          />
        ) : (
          // Se l'icona è un componente React (es. da lucide-react)
          <div className="w-full h-full flex items-center justify-center" style={{ color: iconColor }}>
            {icon}
          </div>
        )}
      </div>
      <div className="flex-1">
      
          <p className={`text-sm ${textColor} opacity-80`}>
            {description}
          </p>
     
      </div>
    </div>
  );
}