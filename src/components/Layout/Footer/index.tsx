export default function Footer() {
  return (
    <footer className="w-full mt-20 p-4 bottom-0">
      {/* <div className="flex flex-row my-10">
        <div className="flex justify-center w-full">
          <span className="font-bold text-lg">Frontend Fusion</span>
        </div>
      </div> */}
      <div className="flex flex-col justify-center">
        <h3 className="self-center text-center text-[1.2rem] font-bold">Redes Sociais</h3>
        <div className="flex flex-col justify-center self-center font-medium gap-2 mt-4">
          <a className="hover:text-blue-700 transition-all duration-100" href="https://github.com/Projeto-FrontEnd-Fusion" target="_blank">Github</a>
          <a className="hover:text-blue-700 transition-all duration-100" href="https://www.linkedin.com/company/projeto-frontend-fusion/" target="_blank">Linkedin</a>
          <a className="hover:text-blue-700 transition-all duration-100"  href="mailto:projetofrontendfusion@gmail.com" target="_blank">Gmail</a>
        </div>
      </div>
    </footer>
  )
}