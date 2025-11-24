import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Images } from "lucide-react";

// Hiệu ứng gõ chữ
const Typewriter = ({ text, speed = 40 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.p
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="w-full max-w-[90%] px-4 text-center text-sm md:text-base pt-4 pb-4 text-black"
    >
      {displayed}
      <span className="animate-pulse">|</span>
    </motion.p>
  );
};

const KyNangTuHoc = ({ language }) => {
  const [showFolder1, setShowFolder1] = useState(false);

  const t = {
    vi: {
      title: "KỸ NĂNG TỰ HỌC",
      subtitle:
        "Nâng cao tư duy – Rèn luyện tinh thần tự chủ – Phát triển bản thân trong Kỷ nguyên số.",
      pdfTitle: "Tài liệu PDF",
      pdf1: "Tầm quan trọng của kỹ năng tự học trong Kỷ nguyên số",
      pdf2: "Biện pháp giúp học sinh sinh viên thay đổi tích cực trong thói quen tự học và quản lý thời gian",
      mediaTitle: "Video - Hình ảnh - Dự án",
      mediaDesc: "Học sinh tự học và ứng dụng kiến thức vào các hoạt động thực tế."
    },

    en: {
      title: "SELF-STUDY SKILLS",
      subtitle:
        "Develop independent learning – Strengthen discipline – Grow sustainably in the digital age.",
      pdfTitle: "PDF Resources",
      pdf1: "The importance of self-study in the digital age",
      pdf2: "Methods to improve students' self-study habits and time management",
      mediaTitle: "Videos – Images – Projects",
      mediaDesc: "Students apply knowledge in real-life activities."
    }
  };


  //------------------------------------------------------

  //------------------------------------------------------
  const PdfFolder = ({ title, pdfs }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <div
        onClick={() => setOpen(!open)}
        className="p-4 rounded-xl bg-[#f3fafc] border flex justify-between items-center cursor-pointer hover:bg-[#e8f5f7] transition"
      >
        <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          📁 {title}
        </span>
        <span className="text-xl text-gray-700">{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="mt-4 space-y-6">
          {pdfs.map((pdf, i) => (
            <a
              key={i}
              href={pdf.link}
              target="_blank"
              className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Ảnh to nằm trên */}
              {pdf.thumbnail && (
                <img
                  src={pdf.thumbnail}
                  alt={pdf.name}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  {pdf.name}
                </h4>
                <p className="text-sm text-gray-500">Nhấn để mở PDF</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};



  //------------------------------------------------------

  //------------------------------------------------------
  const VideoFolder = ({ title, videos }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <div
        onClick={() => setOpen(!open)}
        className="p-4 rounded-xl bg-[#e8f8f6] border flex justify-between items-center cursor-pointer hover:bg-[#dff3f1] transition"
      >
        <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          📁 {title}
        </span>
        <span className="text-xl text-gray-700">{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="mt-4 space-y-6">
          {videos.map((v, i) => (
            <a
              key={i}
              href={v.link}
              target="_blank"
              className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Ảnh to nằm trên */}
              {v.thumbnail && (
                <img
                  src={v.thumbnail}
                  alt={v.name}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  {v.name}
                </h4>
                <p className="text-sm text-gray-500">Nhấn để mở video</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};


  //-----------------------------------------------------------

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-20 bg-white">

      {/* ======= TIÊU ĐỀ ======= */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit
                   bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm inline-block"
      >
        {t[language].title}
      </motion.h1>

      <Typewriter text={t[language].subtitle} />

      {/* ======= TÀI LIỆU PDF ======= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
          <FileText className="text-[#3C9E8F] w-6 h-6" />
          Tài liệu PDF
        </h2>

        {/* Folder 1 */}
        <PdfFolder
          title="TÀI LIỆU AI"
          pdfs={[
            {
              name: "Sáng tác bài hát bằng AI - Suno",
              link: "https://drive.google.com/file/d/14rvbx4P6vzL1-4q5R8Vr24KUIwNeuDvp/view?usp=sharing",
              thumbnail: "https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSmGE8rZ20Bi0m08N95BSLF_SiaCqBZrpEj5kH3dtLQGakLtIL41BWDqjSE5RnA9T70E8orAjw_ioSX_LG6e2IsIyN8RNJ9QUHyX6YRiSbr2zpCtzTuewVnFyycytFdv7Fc9ybLW784yR2KJFj71bIP1b27yDx0TQhqBgLSpMVxc7tjBjJ4qVs2jMVhKtILbhLT1qBEmXhuKlUewjNuxij3_TKTiqkRAi9Fnt_gqRn71T2LzKsq7aKOtc40h5DfNC9lQCuy-UJ0zllI8mbq413szoW0565OfsoGxjBOIeu2eDfMJAAgblIRsn2GKArp1ervf_7m6Qkig2E5SR8qyM1LwMqj_2aNPZTO6RgSzN7DNAnEqG2tPelUWzc5D9P_61hoqGd2RtbpCJDr8ToS9mKY0VcOakCONr0xO7iLUVo5n2-SjL_Wcdg3qmbhl_d83TkRyCb8x89ZFPnetqaGDhiKGgA3o41z5RlUIHSpybLWQ_befjQKTjgikKYga8FG2uCOCOat9i_G6MnfJ9VPXKPz4g24636b3BAeTqmmth-yWQqYyGKfAyErTjrsxr2R7cqfxFUP_2rQQfBPy8StGAt-3N-JmBVBuprk57XdiaIA7bQWw50cHamNJrcABAUdnU0ZKK8bEQuBTikSeYHyilzkylW7P2D8f1ZYzr_hpWWWIgDQ3PML7p86S3z1n2o0pz5DFr4rE83eDbaUQVqQx6PBXYd21cRlsA3WV-89rwmzm_0py-J-wmhSWAXzaT32SHrSYSAwj6JH7nM63aVRQwRMThKwFYZkQjL2kH1Y6Mya5B5mJbIkZ_mQTXN6H95iXaj05xODNC-WTxiqKYmYA87yLF7lNMGQX8Iwh3YuSprvwrk7K0veKmr7xlwwTX8-iLnSc7dCIt1V34Ct6bryA6ZkX_lnCRFO4DrK3VqVUnbD2Ep8nM-7bfqae7pX5NvJ_LJqXWdSNI29gPxTUwjDDG9n_f0050xhCyQc_m2ohy-dkGD6hFg0okHpEeVWUsmN-ZAyZUAljB-PBUhzxhdchksqO5SZs86fKmPan3qZnMYUSp8dh6E3B-iFUJb43z8I8Fvna2UiPcoRsf1BF84W8J7el1GJ4WwdsGJHLLHro_R7ykTLwHjfGsiCqagPIvF2RY5gNU42YlWRO_FAuMQ6ePLROBuyIwwYANzPaI1EaVJfMRmlVUXcG_s5GugMU5CHgClDZURl6szBODPwXsNmw4JfS-C4EBvPrt-TEYPn3M6aNGMmR5YIvLD_gWXI=s1024-rj"
            },
            {
              name: "Một số tài nguyên về AI tham khảo thêm",
              link: "https://drive.google.com/file/d/1Eq7ySlDTm36X7mn6qELGaS2ve72rAU2E/view?usp=sharing",
              thumbnail: "https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSm08GvMgqxnYywZjmV5-clQK9TJ9GEXUcZIMavOezUttdNbqLrQzDxrO9x93XB58uDI03TGwvQFX0SVBn3hPst_VVGid2eoRoBsI_QoRxYTYqOOZY6JGVGo_PWUSC76_lfIcwV2q_cuQPdaExLUaROjz0mD4DGB7_m_WX7S0eZJPQf_4jDl1RaMS1Y7rVlQqYNUh23B-mflIHZQjquX1N0YSx-GOq5ZjitdkA_1JeAi7hISXctNr-LAaAXzIBjDlWPKRxE1Mk8HRb4pUW13N74sVqf4LSjQb2_ZGrlDCZ9lC5Jd8WjAtrw43ViaWvW9OHvqJJn5AoixOTvZEk63hlWAi7yrgbre10HzROhZn9Akyl4IS3iurOw1qsrjZk8P_m6dvZIEKRCoYJYOSx_QE362NEV42pGydOQ6BkjfWPBxOcEh0qTF14tJb-RUlcl8ib_VDOt2sQPqC9gU5Iz1mGdV3TcEpbOzUkUVrwrf2aX_MdZwxRBQa0pS93SotKLx1qji0N9w97OVyP2rwSlL9HEc-9w-HcEgfk8zKgO_XvWtbM83qaj2wbQ4YricCUF18KkUfZUB3j9cT826sYVAxRTVf4o7gVSEcVE4TNBlM4CqPE-PNfJPvoZlF5kfLVMLmnn2jAO-BExJn6kBDtguelT77pe2s2CMbJiJTFAVjgPm59aAwnnX_HCncE8_QqZgUOrQ7DYZ7njcsB0a10EPZYDRHZ1GtBsjUvEaAzZjkZ_xNOC9Z0DVUE7yfgcDANWxcNToIO5B8TEFY-ffZ-xKvmPZXKu9Fue1S-vDgYPs3pKP-Sqd1BoA-FL_iwCL7zeZtnHo_hjMcwA1XCbkNyJFCA7BR03VuK1dq-_mOJmis8-qhBFEsLMpt_kVjJYXtxLoOTVs-Hf4zVzdEQogyz1T27YtYy_Emh0Veu_jQCcFCcwk3qwZsb4wRIA8P2Wv_UbK1T9SUNITTboRbMm1gXOU7SXuaOQzy_RS7E0wsX71uCczFwjb78R8lLZw23HttXmFBvWDQEmfaJvR2ZhQeZXoiCdWytSjjd5YWPbbAJU4uaJot-wHocs5sR_woNUvUbc1Nl9BhB2PGDsxIs__2JhfOnZJ-bkxGcmS5i72m2LToBKR3oQ-CcNni9qH-8OjEQSOO4xvRxGgXC5PQeHvId6HD5882VNg26L-B4PUPHjwRZkGBCD-OVexZFVnVJeQpGp6p17YLI1cDfehjfo-jPs3kJAzWqooAENeGeM6CiBtmfoFZYwYugqzPztUA5s=s1024-rj"
            }
          ]}
        />


        {/* Folder 2 — bạn có thể thêm thoải mái */}
        <PdfFolder
          title="ỨNG DỤNG FOREST TRỒNG CÂY ẢO GIÚP TẬP TRUNG VÀ HÌNH THÀNH THÓI QUEN TỐT"
          pdfs={[
            { name: "Cách để Sử dụng ứng dụng năng suất Forest", link: "https://drive.google.com/file/d/1TVDHX4HbOfKZJQgSmgnvrwMwWjpZMKpD/view?usp=sharing" }
          ]}
        />

        <PdfFolder
          title="PHƯƠNG PHÁP POMODORO QUẢN LÝ THỜI GIAN VÀ CẢI THIỆN SỰ TẬP TRUNG"
          pdfs={[
            { name: "Pomodoro là gì?", link: "https://drive.google.com/file/d/150MccvFhqCnwzSigYLikSYyGSII64-gn/view?usp=sharing" },
            { name: "12 Pomodoro App quản lý thời gian tốt nhất cho điện thoại", link: "https://drive.google.com/file/d/1MOSBCLm6Nx4rDoYORNSUKNbUe1UOSf0m/view?usp=sharing" }
          ]}
        />

        <PdfFolder
          title="LẬP KẾ HOẠCH HỌC TẬP VỚI ỨNG DỤNG GOOGLE CALENDAR"
          pdfs={[
            { name: "Cách sử dụng Google Calendar", link: "https://drive.google.com/file/d/1PsyqHSNy1ub-wdwcORryCkyIwFtDuXgQ/view?usp=sharing" }
          ]}
        />

      </motion.div>


      {/* ======= MEDIA ======= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
          🎬 VIDEO
        </h2>


        <div className="mt-6">

          <VideoFolder
            title="VIDEO GIẢI TOÁN"
            videos={[
              {
                name: "VIDEO CÁCH TÌM TRỌNG TÂM TAM GIÁC",
                link: "https://drive.google.com/file/d/19Q-R-p83n763T9ymvhrcb6YBADEtEMfb/view?usp=sharing",
                thumbnail: "https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSkhEoxQVv8cj4h-DobIZmIZqZknG3HIO__QhfMvpYX5LsC06nhd7g6TMA-M6cypiCjHciX7aYjuRU04UU6Ur3bw6BokloSIL6jf5Fchsh2v1xq2wyNhlIdZbN1_7CFKhA6I8bT65NZwL_IhmD9np_dCt22bq1tx9yn2e-vmS07irH8wEHTF_-RsbVdKQxy7UTpYMqgRv_KByGyffeGBWpPItCoKKagY8kSCOD0WtxUbRa87f_Y0yFHYVd1vHU9Gpt-TRVLYr09oP3PaGGxt8goriwGi1Z7Wg6sNNtrt_WL4-FMQXbhLPYd7GD7N2JSDIkWfwSX_kjv2uXXoIQ9c_Xrau6ckYUKhwcUBtZ7rnJqGg2K2JO2Kl1KCQDG5ancmrIvU19YOahgRRxmnDG8Mh0J1qZI0SRiK4U-IOGEAaKHOVTBb7MXVvGtckKoP7A4A8fZ9j9n0skozE9H60__FnzHug-bw8JZup6B5SqriqRqSgacoZRdaed529fOLbLTC2I7ko7mQflQQMVNc13dAWd7r09sJN4r3vFXO0Og2vVNG_ckzIEOCDV0ofapWzw_KyfLX1bRbLN9ijnbeMhqCkgkC4HL4wUVvkp_dd127FdXqLZYDOrHFcZL4ebpWZSMxc-aaQq1Zzr2ICvdimJO_SI8hT43yl3g3vYXQPzw0rAxmKjW2xYZQ9zK3Quoh3PmCWwYRgj_edn-nS8yHxWDUDniqbSlkCYKn-2eFyzPjry1bWkHg12kjEOr7ZwzQ4TDPO5u3CEVt5j6NSJ3td0f5Ht-Ry73I7iwVzrmLVM3gDXvn1LOn5YRwszKimiXhw_q5MYBGcijkobUt_-mcqjQZ5qsDfRztErbUfLqoE3-OoMlpO3xHBIlv-g0ffR1-wPK57OaqZfgsegXvsCZ_SSFrasSqGPAbIKAfkdCsnOZAhisVIn1aiDgchHb1Gc3c3jtcipL8scZ7OtRQmAPvD6thVUS9eCjKmiRLmFqaujwU-eHRCytrC0ZbeDbDGUf7wgajc2C2IGX0CmRs964bpexel0iwBH77OIq1halG93XoyXDoR3itp-Z09Q8y5e5kVLjsQfmY9urcGJlNTFRCGryTO2GpwKOqRw1dVmQvCcmcAlsx1DLjwZcypS94P3iykqXJuap2XP8l0bfgberRKqiN6u1nyneRvOxAKVCIcoKzC58kZcuUwnuZmB4dN_TqGpI8W2RA_WPgT9OYvW0EBtdjdjrPGHTsHHgC86011v-SVnW1oZ9e8hskwifpJ2g=s1024-rj"
              },
              {
                name: "GÓC GIỮA HAI MẶT",
                link: "https://drive.google.com/file/d/1kJNGevsvSxtkgzr3GyKrPJc_niX8I414/view?usp=sharing",
                thumbnail: "https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSmmnef8WQcX6EmM9iTklARhPC0EkmrqnGokgtmztAPpmLSfmLo0iVD4O2uwm8R2A7RB7HCwThfQrt9b7JdoZu4Ns-c6HeGnhp_kNed-Lqj0k4faISf1zRdO_XjTja1z_r5Xt02DVjEgObk0UdJdgCUNDJxZz51AG_qwYC_QjsTBSF8ipwW2fwJOZoamiviZlSQshVrucjhHweKrcIWM66SKI36S8Ytv4Z0FkaB9yIzoDq_JBgnLdDnnpX-Yq4VOgbW37bxGAHY5KrRg1xlHzoJZ9qusah66Cn0hZnpwIW12tsT6BYdTkwQNg-ByzO6HvFu5ys0qN_wceOntLo31l9U2EX3DLbu2SsmqSL84XL19NGef7sM_urnU7JzRhbUYXfqlwePhQaeruAai8c8Hu-SbF5dezATGeYPfMYULoRr3FFTYvLe0ar5Cco_3NHWqoQJ1moCIfq6-yAVKvK21IQ318hUZbcvMSx8kJ5W8RHR672b-pvd3Ebe6tHsxKMwjubEZMc4rDjLhu82OMiGcnRmXY7IOxVoIR8UvXCB1FRAc_9Z63jAHcQgP_Mx-TsDXU0WO_Mz3Azf8KYOTgmTfujiQi5pwWOfi007vqe0FnEOSkfpSybtnoj0j2owhI1dT0TKMvHKilwHDjU5JBuTjVpVsGcVHzBrcIOKwOi6lXPFL1NvuMDW9zLB8YpupXdRNHa82XTGvNZGhDi9RPihq_Qo6BCqHSbUBQg10AG9Ha3C7KbxDPmILPSeZPhqxD3BncCRP8HjsAA2etx6Jk3YDtHifhJ-x3lV_DNMCLj3U9-50TbbfbzYAU4A9bXGrGM9wrjesq1HieW4f2SH-S20bD6Hvdn8n8KlpxodTNG5xFwHKS9Oldl63QOl1_-QyLrW91xB6KuWAgM-kRwSqHOD3kxBdalOiPhYZcIOM2MmYnYjmcBZwKeRpsndi7vpVOIZCYIyl_mt7ig7FrC6zGWPQj8yf7PdJ1Bn3ypo6NZJSA45eNLmcJypuIBBKWLnfmO8OFd1k-v5TMsnguccNxJdtbAPQ0a7u1dqWqKrN5muU6nwBPnIsT9wt0mOUVCjQwtGkoqsCYgCpee7fKz1I5uj-WM4VqWsBFYk0IlFnUmKFt7FMko4M1Ycv2dU2LqRY-Wh2_w5g82C2GUByxoAcw3Nta1ku1rIYc6uKyc-Yf7KVaBTZP0W-QSiAaRwCmKqf6HqVXh5gs0U-sthV95CNvoopf1TjGsrOL4DtuKygfHeFaTXHu5_wYQsVeYK3sww=s1024-rj"
              },
              {
                name: "CÁCH VẼ HÌNH LẬP PHƯƠNG",
                link: "https://drive.google.com/file/d/17LxPeTNUUuu7LgmaIaMmS-IUcP4wglDG/view?usp=sharing",
                thumbnail: ""
              },
              {
                name: "CÁCH VẼ HÌNH CHÓP ĐỀU",
                link: "https://drive.google.com/file/d/1xzdwhwAnkMlhywd9TCW6JABdBf9qr2ML/view?usp=sharing"
              },
              {
                name: "CÁCH TÌM TOẠ ĐỘ ĐIỂM TRONG Oxyz",
                link: "https://drive.google.com/file/d/12KKBUHMw3PjJ3V1Z0B5te-cvaNRYecds/view?usp=sharing"
              },
              {
                name: "CÁC BƯỚC TÌM GÓC GIỮA ĐƯỜNG VÀ MẶT",
                link: "https://drive.google.com/file/d/1YMAI8Mzl-_N9Z6jkU9QaiO7PeFZq9EuQ/view?usp=sharing"
              }
            ]}

          />


          <VideoFolder
            title="VIDEO TOÁN THỰC TẾ"
            videos={[
              {
                name: "SGK Đường đi máy bay Oxyz",
                link: "https://drive.google.com/file/d/1Z5rp-6SMILH_5wy53DNqkfzwB2dNiX_I/view?usp=sharing"
              },
              {
                name: "Lực tác động vào vật",
                link: "https://drive.google.com/file/d/1WM_gJQq0sSlMDVp-KvH7AOtY0VCG6ZOA/view?usp=sharing"
              },
              {
                name: "Định lý Sin thực tế",
                link: "https://drive.google.com/file/d/1hOg7Qzbi1B4Yfauz4w2py46EcSqmlxTE/view?usp=sharing"
              }
            ]}

          />

          <VideoFolder
            title="SÁNG TÁC NHẠC BẰNG AI"
            videos={[
              {
                name: "1. MV Trường hợp hai cạnh góc vuông",
                link: "https://drive.google.com/file/d/16tvRxAdPyJiL7SaOOdIXxZCtDuXu7n9a/view?usp=sharing"
              },
              {
                name: "2. MV Trường hơp cạnh góc vuông-góc nhọn kề",
                link: "https://drive.google.com/file/d/1Jk64p0H5W-hl5oB5tNhFd9An-NdNXq3l/view?usp=sharing"
              },
              {
                name: "3. Trường hợp bằng nhau cạnh huyền-góc nhọn",
                link: "https://drive.google.com/file/d/1upjr8zH0BpkbkkK50oLvvFHp8Tpo3uwZ/view?usp=sharing"
              },
              {
                name: "4. MV Trường hợp cạnh huyền-cạnh góc vuông",
                link: "https://drive.google.com/file/d/1x5y5xK-M5PxKQKv3KNnHFXUQSQxr6yq4/view?usp=sharing"
              }
            ]}

          />


        </div>




      </motion.div>

    </section>
  );
};

export default KyNangTuHoc;
