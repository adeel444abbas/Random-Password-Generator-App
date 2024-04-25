import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLenght] = useState(8);
  const [checkNums, setcheckNums] = useState(false);
  const [checkCharacters, setcheckCharacters] = useState(false); 
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  // console.log(passwordRef);

  const handleCopyToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  const passwordGenerator = useCallback(() => {
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   let pass = "";
   if(checkNums){
    str += "0123456789";
   }
   if(checkCharacters){
    str += "@#$%^&*!@~`/|][{}<>=+";
   }
   for(let i=1; i<=length; i++){
    let indexOfChar = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(indexOfChar);
   }
   setPassword(pass);
  }, [checkNums, checkCharacters, length, setPassword]);

  useEffect(()=>{
   passwordGenerator()
  }, [length, checkNums, checkCharacters, setPassword]);

  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>
        <div className="header">
          <input type="text" placeholder="password" defaultValue={password} ref={passwordRef}/>
          <button className="copyBtn" onClick={handleCopyToClipboard}>copy</button>
        </div>
        <div className="footer">
          <input type="range" name="range1" id="range1" min={1} max={50}  value={length} onChange={(e) => setLenght(e.target.value)} />
          <span>length ({length})</span>
         <input type="checkbox" defaultChecked={checkNums}  onChange={() => setcheckNums(prev => !prev)}/> <label>Numbers</label>   
         <input type="checkbox" defaultChecked={checkCharacters} onChange={()=> setcheckCharacters(prev => !prev)}/> <label>Characters</label>
        </div>
      </div>
    </>
  );
}
export default App;
