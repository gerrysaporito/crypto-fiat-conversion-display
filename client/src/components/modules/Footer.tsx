import { Button } from '@chakra-ui/react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

/*
 * React component used to display information about the developer.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="w-full px-8 sm:px-20 py-10 sm:py-20 bg-[#111111] text-white">
      <div className="grid grid-cols-1 gap-4">
        <p className="text-center sm:text-left">
          GentleTengu made this with 💜 from Canada 🇨🇦
        </p>
        <div className="flex justify-center sm:justify-start">
          <a
            href="https://twitter.com/gentletengu"
            target="_blank"
            rel="noreferrer"
            className="border-[2px] rounded-xl mr-6 border-[#1DA1F2]"
          >
            <Button colorScheme="twitter">
              <FaTwitter />
            </Button>
          </a>
          <a
            href="https://github.com/gerrysaporito"
            target="_blank"
            rel="noreferrer"
            className="border-[2px] rounded-xl mr-6"
          >
            <Button colorScheme="github">
              <FaGithub />
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/gerrysaporito/"
            target="_blank"
            rel="noreferrer"
            className="border-[2px] rounded-xl mr-6 border-[#0A66C2]"
          >
            <Button backgroundColor="#0A66C2">
              <FaLinkedin />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
};

const socials = [];
