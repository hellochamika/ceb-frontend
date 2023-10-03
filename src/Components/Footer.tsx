import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillInstagram,
  AiOutlineGlobal
} from "react-icons/ai";

function Footer() {
  return (
    <footer className="flex flex-col items-center pt-8 bg-zinc-700 text-center text-white absolute w-full h-28 bottom-0">
      <div className="container">
        <div className="flex flex-row gap-5 justify-center">
          <AiFillFacebook />
          <AiOutlineTwitter />
          <AiFillInstagram />
		  <AiOutlineGlobal/>
        </div>
      </div>
      <div className="w-full p-4 text-center text-white">
        ©2023 Copyright | Ceylon Electricity Board
      </div>
    </footer>
  );
}

export default Footer;
