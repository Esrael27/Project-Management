import ProjectForm from "@/components/projects/ProjectForm";
import ProjectList from "@/components/projects/ProjectList";



const HomePage: React.FC = () => {

  return (
    <div>
      <h1>Home Page</h1>
         <ProjectForm/>
         <ProjectList />
    </div>
  );
};

export default HomePage;
