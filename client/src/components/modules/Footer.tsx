import { Button } from '@chakra-ui/react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full px-20 py-20 bg-[#111111] text-white">
      <div className="grid grid-cols-1 gap-4">
        <p>Made with 💜 by @GentleTengu from Canada 🇨🇦</p>
        <div className="flex">
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
