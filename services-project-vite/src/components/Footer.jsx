const Footer = () => {
  const footerNavs = [
    {
      name: "About",
    },
    {
      name: "Blog",
    },
    {
      name: "",
    },
    {
      name: "Team",
    },
    {
      name: "Careers",
    },
    {
      name: "Support",
    },
  ];

  return (
    <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
      <div className="max-w-lg sm:mx-auto sm:text-center">
        {/* <img
          src="https://www.floatui.com/logo.svg"
          className="w-32 sm:mx-auto"
        /> */}
        <p className="leading-relaxed mt-2 text-[15px]">
          Lorem Ipsum has been the industry&apos;s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
        {footerNavs.map((item, idx) => (
          <li key={idx} className="hover:text-gray-800">
            <a href={item.href}>{item.name}</a>
          </li>
        ))}
      </ul>
      <div className="mt-8 items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">&copy; 2022 All rights reserved.</div>
      </div>
      <style>{`
        .svg-icon path,
        .svg-icon polygon,
        .svg-icon rect {
            fill: currentColor;
        }
    `}</style>
    </footer>
  );
};

export default Footer;
