import ArticleGenerator from "@/components/ArticleGenerator";

export default function Home() {
  // const [employee, setEmployee] = useState<any[]>([]);

  // useEffect(() => {
  //   const getEmployee = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3000/api/employees");
  //       setEmployee(res.data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   getEmployee();
  // }, []);

  return (
    <div>
      <ArticleGenerator />
    </div>
    //  <div className="flex gap-5">
    //   {employee.map((e, i) => {
    //     return <div key={i}>
    //       <h1>{e.firstname}</h1>
    //       <h3>{e.lastname}</h3>
    //       <p>{e.age}</p>
    //       <p>{e.gender}</p>
    //       <p>{e.department}</p>
    //     </div>
    //   })}
    //  </div>
  );
}
