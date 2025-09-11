function SocialButton({ href, icon, label, bgLight, bgDark }) {
    const IconComponent = icon;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-shadow duration-300
                  ${bgLight} text-white hover:shadow-[0_0_20px_8px_rgba(240,200,250,0.4)]
                  dark:${bgDark} dark:hover:shadow-[0_0_20px_8px_rgba(115,86,201,0.8)]`}>
      <IconComponent /> {label}
    </a>
  );
}


export default SocialButton