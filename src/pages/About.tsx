import api from "../lib/api";

const AboutPage = () => {
  const fetchData = async () => {
    try {
      const response = await api.get("/articles"); 
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData()

  return (
    <main className="p-10">

    </main>
  );
};

export default AboutPage;
