function AccountDiv() {
  return (
    <div className="mx-2">
      <div className="flex flex-row justify-end gap-2">
        <a href="/auth/login" className="px-4 py-2 rounded-md bg-emerald-500 text-white font-bold">Entrar</a>
        <a href="/auth/register" className="px-4 py-2 rounded-md bg-blue-500 text-white font-bold">Cadastrar</a>
      </div>
    </div>
  )
}

export default function Header() {
  return (
    <div className="w-full">
      <div>
        <span className="self-center text-center">Frontend Fusion</span>
      </div>
      <AccountDiv />
    </div>
  )
}