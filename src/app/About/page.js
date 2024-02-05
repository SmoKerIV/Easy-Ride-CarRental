import { Image } from "@nextui-org/react";

function AboutUsPage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <Image
            className="w-full h-auto rounded-lg"
            src="https://cdn.discordapp.com/attachments/1052301242833051770/1197957008003973200/pngwing.com_4.png?ex=65bd2767&is=65aab267&hm=382f361eed7138e61e553fe9b03dbd2b19b7af68f781d91dafcdd90db8d6694d&" // Replace with your image URL
            alt="About Us"
          />
        </div>

        <div className="md:w-1/2 md:pl-8">
          <p className="text-lg mb-8">
            Welcome to <b>EasyRide</b>. We are dedicated to providing
            hassle-free and budget-friendly car rental solutions.
          </p>

          <h2 className="text-2xl font-bold mb-2">Who We Are</h2>
          <p className="text-lg mb-8">
            At EasyRide, we make car rentals easy and affordable for you. Our
            goal is to simplify the process and offer cost-effective solutions.
          </p>

          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-lg mb-8">
            Our mission at EasyRide goes beyond just providing services. We
            believe in a bright future for all and are committed to exceeding
            customer expectations. Our consistent hard work is aimed at earning
            your trust and loyalty.
          </p>

          <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
          <p className="text-lg mb-8">
            Our vision is to become the world's most loved and profitable car
            rental bookings provider. We aspire to set new standards of
            excellence in the industry and create lasting impressions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
