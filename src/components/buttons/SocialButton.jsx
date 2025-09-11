import GenericButton from "./GenericButton"; 

function SocialButton({ href, icon, label, bgLight, bgDark, hoverGlow }) {
    const IconComponent = icon;

  return (
    <GenericButton
      as="a"
      href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${bgLight} dark:${bgDark} text-white`}
        style={hoverGlow ? {} : undefined}
      >
        <IconComponent className="text-lg" /> {label}
    </GenericButton>
  );
}


export default SocialButton