// src/components/Logo.tsx
// Purpose: iKrypt logo component

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
          <path
            d="M18 2C9.163 2 2 9.163 2 18C2 26.837 9.163 34 18 34C26.837 34 34 26.837 34 18C34 9.163 26.837 2 18 2Z"
            fill="url(#paint0_linear)"
          />
          <path
            d="M18 6C13.029 6 9 10.029 9 15V17H8C7.448 17 7 17.448 7 18V28C7 28.552 7.448 29 8 29H28C28.552 29 29 28.552 29 28V18C29 17.448 28.552 17 28 17H27V15C27 10.029 22.971 6 18 6ZM11 15C11 11.134 14.134 8 18 8C21.866 8 25 11.134 25 15V17H11V15ZM18 24C16.895 24 16 23.105 16 22C16 20.895 16.895 20 18 20C19.105 20 20 20.895 20 22C20 23.105 19.105 24 18 24Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="2"
              y1="2"
              x2="34"
              y2="34"
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