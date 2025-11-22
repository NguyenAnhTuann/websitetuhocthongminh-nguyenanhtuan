import React from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FaFacebookF, FaXTwitter, FaGithub, FaInstagram, FaLinkedinIn, FaTelegram } from 'react-icons/fa6';
import { FiExternalLink } from "react-icons/fi";
import { LuNotepadText } from "react-icons/lu";

const Contact = ({ language }) => {
  const translations = {
    vi: {
      title: "THÔNG TIN LIÊN HỆ",
      subtitle: "Hãy kết nối với tôi qua các thông tin bên dưới!",
      cvButton: "My CV",
      contacts: [
        { title: "Email", value: "nguyenanhtuan.it@outlook.com", link: "mailto:nguyenanhtuan.it@outlook.com", icon: <EnvelopeIcon className="w-6 h-6 text-sky-600" /> },
        { title: "Điện thoại/Zalo", value: "0869094929", link: "https://zalo.me/0869094929", icon: <PhoneIcon className="w-6 h-6 text-sky-600" /> },
        { title: "Facebook", value: "Kết nối Facebook", link: "https://www.facebook.com/NguyenAnhTuxn", icon: <FaFacebookF className="w-5 h-5 text-sky-600" /> },
        { title: "Instagram", value: "Kết nối Instagram", link: "https://www.instagram.com/nguyenanhtuan___/", icon: <FaInstagram className="w-5 h-5 text-sky-600" /> },
        { title: "X (Twitter)", value: "Kết nối X", link: "https://x.com/nguyenanhtuan__", icon: <FaXTwitter className="w-5 h-5 text-sky-600" /> },
        { title: "Github", value: "Kết nối Github", link: "https://github.com/NguyenAnhTuann", icon: <FaGithub className="w-5 h-5 text-sky-600" /> },
        { title: "LinkedIn", value: "Kết nối LinkedIn", link: "https://www.linkedin.com/in/ngg-anhtuan", icon: <FaLinkedinIn className="w-5 h-5 text-sky-600" /> },
        { title: "Telegram", value: "Kết nối Telegram", link: "https://t.me/nguyenanhtuxn", icon: <FaTelegram className="w-5 h-5 text-sky-600" /> },
        { title: "Form Liên hệ", value: "Điền Form", link: "https://forms.gle/abcd1234", icon: <LuNotepadText className="w-5 h-5 text-sky-600" /> }
      ]
    },
    en: {
      title: "CONTACT INFORMATION",
      subtitle: "Let's connect through the information below!",
      cvButton: "My CV",
      contacts: [
        { title: "Email", value: "nguyenanhtuan.it@outlook.com", link: "mailto:nguyenanhtuan.it@outlook.com", icon: <EnvelopeIcon className="w-6 h-6 text-sky-600" /> },
        { title: "Phone/Zalo", value: "0869094929", link: "https://zalo.me/0869094929", icon: <PhoneIcon className="w-6 h-6 text-sky-600" /> },
        { title: "Facebook", value: "Connect Facebook", link: "https://www.facebook.com/NguyenAnhTuxn", icon: <FaFacebookF className="w-5 h-5 text-sky-600" /> },
        { title: "Instagram", value: "Connect Instagram", link: "https://www.instagram.com/nguyenanhtuan___/", icon: <FaInstagram className="w-5 h-5 text-sky-600" /> },
        { title: "X (Twitter)", value: "Connect X", link: "https://x.com/nguyenanhtuan__", icon: <FaXTwitter className="w-5 h-5 text-sky-600" /> },
        { title: "Github", value: "Connect Github", link: "https://github.com/NguyenAnhTuann", icon: <FaGithub className="w-5 h-5 text-sky-600" /> },
        { title: "LinkedIn", value: "Connect LinkedIn", link: "https://www.linkedin.com/in/ngg-anhtuan", icon: <FaLinkedinIn className="w-5 h-5 text-sky-600" /> },
        { title: "Telegram", value: "Connect Telegram", link: "https://t.me/nguyenanhtuxn", icon: <FaTelegram className="w-5 h-5 text-sky-600" /> },
        { title: "Contact Form", value: "Fill Form", link: "https://forms.gle/abcd1234", icon: <LuNotepadText className="w-5 h-5 text-sky-600" /> }
      ]
    }
  };

  return (
    <section id="contact" className="min-h-screen pb-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-white pt-24 px-4">

      {/* Tiêu đề */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-extrabold flex justify-center items-center gap-3 text-gray-900 dark:text-white">
          <UserGroupIcon className="w-8 h-8 text-sky-600" />
          {translations[language].title}
        </h2>
        <p className="text-gray-400 mt-2 text-sm">{translations[language].subtitle}</p>
      </motion.div>

      {/* Nút My CV */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-8 mb-12 flex justify-center"
      >
        <a
          href="https://drive.google.com/file/d/13F8UwV06bmFO27coub4JLLLgNW5DNMhS/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden border border-gray-300 text-gray-700 dark:text-white font-outfit font-medium py-2 px-6 rounded-2xl group transition duration-300 ease-in-out hover:text-white dark:hover:text-white flex items-center gap-2"
        >
          <span className="absolute inset-0 bg-sky-600 transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 ease-out z-0 rounded-2xl"></span>
          <span className="relative z-10 flex items-center gap-2">
            <LuNotepadText className="w-5 h-5" />
            {translations[language].cvButton}
          </span>
        </a>
      </motion.div>


      {/* Các Contact Card */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2, delayChildren: 1.5 } }
        }}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {translations[language].contacts.map((contact, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <ContactCard {...contact} />
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};

const ContactCard = ({ icon, title, value, link }) => {
  const Wrapper = link ? 'a' : 'div';

  return (
    <Wrapper
      href={link}
      target={link ? "_blank" : undefined}
      rel={link ? "noopener noreferrer" : undefined}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl hover:shadow-lg hover:border-sky-600 dark:hover:border-sky-600 transition relative cursor-pointer block"
    >
      <div className="flex items-start gap-5">
        <div className="flex items-center justify-center relative w-10 h-10">
          <div className="absolute w-10 h-10 bg-cyan-100 dark:bg-cyan-400/10 rounded-xl opacity-60"></div>
          <div className="relative z-10 text-sky-600 text-xl">
            {icon}
          </div>
        </div>

        <div className="flex-1 ">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed">{value}</p>
        </div>

        {link && (
          <FiExternalLink className="w-5 h-5 text-sky-600 mt-4" />
        )}
      </div>
    </Wrapper>
  );
};

export default Contact;
