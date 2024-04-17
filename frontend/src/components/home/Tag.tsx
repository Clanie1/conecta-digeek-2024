type TagProps = {
  href: string;
  title: string;
};

const Tag = ({ href, title }) => {
  return (
    <a
      href={href}
      className="inline-block text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-2 mb-2 transition-colors duration-300"
    >
      {title}
    </a>
  );
};

export default Tag;
