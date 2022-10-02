import Image from "next/image";

const images = [
  "/assets/sub-banner/1.jpg",
  "/assets/sub-banner/2.jpg",
  "/assets/sub-banner/3.jpg",
];

const SubBanner: React.FC = () => (
  <section className="container grid grid-cols-1 gap-3 md:grid-cols-2">
    <div className="space-y-3">
      <div>
        <Image
          src={images[0]!}
          alt="banner"
          width="100%"
          height="50%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <div>
        <Image
          src={images[1]!}
          alt="banner"
          width="100%"
          height="50%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
    </div>
    <div>
      <Image
        src={images[2]!}
        alt="banner"
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
    </div>
  </section>
);

export default SubBanner;
