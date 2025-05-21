// src/components/Logo.tsx
// Purpose: iKrypt logo component with shield and lock design

const Logo = ({ className = "h-10 w-auto" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        {/* Shield shape with gradient */}
        <path
          d="M18 3L4 9V16.6C4 23.5 9.9 30 18 33C26.1 30 32 23.5 32 16.6V9L18 3Z"
          fill="url(#paint0_linear)"
        />
        
        {/* Lock icon */}
        <path
          d="M22 16H21V14C21 11.8 19.2 10 17 10C14.8 10 13 11.8 13 14V16H12C11.4 16 11 16.4 11 17V25C11 25.6 11.4 26 12 26H22C22.6 26 23 25.6 23 25V17C23 16.4 22.6 16 22 16ZM15 14C15 12.9 15.9 12 17 12C18.1 12 19 12.9 19 14V16H15V14ZM17 22C16.2 22 15.5 21.3 15.5 20.5C15.5 19.7 16.2 19 17 19C17.8 19 18.5 19.7 18.5 20.5C18.5 21.3 17.8 22 17 22Z"
          fill="white"
        />
        
        {/* Define gradient */}
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="4"
            y1="3"
            x2="32"
            y2="33"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-white text-xl font-bold">iKrypt</span>
    </div>
  );
};

export default Logo;