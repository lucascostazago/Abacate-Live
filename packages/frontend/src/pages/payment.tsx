import Input from "../../components/input";
import Button from "../../components/button";
import { useState } from "react";
import { UserIcon } from "lucide-react";

function PaymentPage() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [pixCode, setPixCode] = useState("");
  
  const handlePix = async () => {
    try {
      const response = await fetch('http://localhost:3000/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: Number(value),
          name: name
        })
      });
      
      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      
      if (data.success) {
        setQrcode(data.data.data.brCodeBase64);
        setPixCode(data.data.data.brCode);
      } 
    } catch (error) {
      console.error('Erro ao criar PIX:', error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100/5">
    {isLoading && (
      <div className="">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )}
    {step == 0 && (
      <div className="flex flex-col justify-center items-center p-10 gap-2 rounded-lg shadow-lg relative bg-white">
        <div className="bg-gray-300 w-36 h-36 rounded-full border-6 border-white absolute -top-15 left-32 flex justify-center items-center shadow-sm">
          <UserIcon className="w-20 h-20 text-white" />
        </div>
        <h1 className="text-2xl font-bold mt-16">Lucas Zago</h1>
        <p className="text-lg text-gray-500">Envie sua mensagem</p>
        <div className="flex flex-col gap-8 mt-8">
          <Input placeholder="Digite o nome de usuário" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Digite a mensagem" value={message} onChange={(e) => setMessage(e.target.value)} description="Limite 150 caracteres" />
          <Input placeholder="Digite o valor" value={value} onChange={(e) => setValue(e.target.value)} description="Mínimo de R$1,00" moneyFormat />
          <Button onClick={() => {
            setIsLoading(true);
            setStep(1);
            handlePix();
          }}>Continuar</Button>
        </div>
        <p>Powered by <a href="https://abacatepay.com" target="_blank" className="text-green-400">AbacatePay</a></p>
      </div>
    )}
    {step == 1 && (
      <div className="flex flex-col justify-center items-center p-10 gap-2 rounded-lg shadow-lg relative bg-white">
        <h1 className="text-2xl font-bold">AbacateLive</h1>
        <div>
          {qrcode && <img src={`${qrcode}`} alt="QRCode" className="w-90" />}
        </div>
        <p className="font-bold text-lg">Pix copia e cola</p>
        <p className="text-lg text-gray-500 p-2 border-2 border-gray-200 rounded-md max-w-70 text-center overflow-hidden text-ellipsis whitespace-nowrap">{pixCode}</p>
        <Button onClick={() => {
          navigator.clipboard.writeText(pixCode);
        }}>Copiar Código</Button>
        <Button secondary onClick={() => {
          setStep(0);
        }}>Voltar</Button>
        <p>Powered by <a href="https://abacatepay.com" target="_blank" className="text-green-400 mt-2">AbacatePay</a></p>
      </div>
    )}
    </div>
  )
}

export default PaymentPage
