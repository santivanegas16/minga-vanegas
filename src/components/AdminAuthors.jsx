import axios from "axios"
import apiUrl from "../apiUrl"
import { useState, useEffect } from "react";
import header from "../header";
import AdminAuthor from "/img/AdminAuthor.png"

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios(apiUrl + "authors", header()).then(res => setAuthors(res.data.response)).catch(error => console.log(error));
  }, [])

  return (
    <table className="flex flex-col items-center justify-center">
      <tbody className="border-2 rounded-lg">
        {authors?.map((item, index) => (
          // console.log(item)
          <tr key={index}>
            <th className="border-b-2 border-slate-400"><img src={AdminAuthor} className="ms-7" alt="" /></th>
            <th className="text-left ms-2 font-roboto border-b-2 border-slate-400">
              <p className="md:ms-10 ms-3">{item.name + " "}
                {item.last_name}</p>
            </th>
            {/* <th className="border-b-2 border-slate-400">
              <p className="md:ms-10 lg:ms-14">{item.createdAt}</p>
            </th> */}
            <th className="border-b-2 border-slate-400">
              <p className="md:ms-10 lg:ms-14">{item.city}</p>
            </th>
            <th className="border-b-2 border-slate-400">
              <img src={item.photo} className="w-[25px] h-[25px] rounded-full md:ms-10 lg:ms-14" alt="" />
            </th>
            <th className="border-b-2 border-slate-400">
              <input
                className="md:ms-10 lg:ms-14 mr-2 mt-[0] h-4 w-8 appearance-none rounded-full after:absolute after:mt-[1px] after:h-3 after:w-3 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_2px_0_rgb(0_0_0_/_7%),_0_1px_1px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s]   checked:after:absolute  checked:after:mt-[1px] checked:after:ml-[1.0625rem] hover:cursor-pointer dark:bg-neutral-400 dark:after:bg-white dark:checked:bg-[#FF5722] dark:checked:after:bg-white"
                type="checkbox"
                role="switch"
                defaultChecked={item.active} />
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

