   import React, { useState, useEffect } from "react";

function PoemGenerator({name1, name2, gender, age, handleGeneratedPoem, dis}) {
  // const [age, setAge] = useState("");
  const [poem, setPoem] = useState(false);

  const [generatedPoem, setGeneratedPoem] = useState("");


  const generatePoem = () => {
    setPoem(true);
    const poem = age_type(name1, name2, age, gender);
    setGeneratedPoem(poem.props.children);
    // handleChange({ target: { name: 'poem', value: poem } });
    // console.log(generatedPoem);
    handleGeneratedPoem(poem.props.children);
  };

  // function handleAgeChange(event) {
  //   setAge(event.target.value);
  // }

  const child_poem = (name1, name2, age, gender) => {
    let gen, san, ves, adrs, frum, zana, eleg, ves2;
    console.log(age);

    if (gender === "female") {
      gen = "fetita mea";
      san = "sănătoasă";
      ves = "veselă, voioasă";
      adrs = "Fata mea, dulce fetiță";
      frum = "frumoasa";
      zana = "o zina ";
      eleg = "Eleganta,gratioasa ";
      ves2 = " Veselă și lumnioasă";
    } else {
      gen = "baiatul meu";
      san = "sănătos";
      ves = "vesel, voioas";
      adrs = "Scumpul meu, dulce baiat";
      frum = "frumos";
      zana = "un crai";
      eleg = "Elegant ,gratios ";
      ves2 = " Vesel și lumnios";
    }

    const firstVerseC = [
      `La multi ani, ${gen}....
   Iti doresc trai ca-n povesti,
   Astazi este ziua ta...
   Doamne, repede mai cresti!!!`,
      `La mulți ani, ${gen}, 
    Multe zâmbete pe față!
    Oriunde în lumea largă 
  Să te bucuri de-a ta viață!`,
      `${age} anisori implinesti 
   ${zana} din povesti 
   ${eleg} 
   Cuminte esti.`,
      "Ai venit pe neaşteptate \n Şi chiar fără să te cer, \n Ai dat vieții însemnătate \n Îngeraş cu ochi de cer.",
      "Astăzi este ziua-n care \n Te-ai născut pe-acest pămînt. \n Cînd citeai Abecedare, \n Și rosteai primul cuvînt.",
    ];

    const secondVerseC = [
      `Este-o mare bucurie 
   Când te știu doar ${san},
   Viața mea eu ți-o dau ție 
   Să fii ${ves}!`,
      "Să ții piept la toate-n viață\nTe voi ajuta mereu, \nLacrimi n-o să ai pe față \nCât pe lume mai sunt eu!",
      `${adrs},
   Toată viața voi munci 
   Să nu simți vreo umilință 
   Orișicât de greu ar fi...`,
      `Mare te-ai facut 
   Eu nu te-am cunocut 
   Ca ${frum} esti 
   Ca ${zana} din povesti.`,
      "Un copil e o minune \n Ce cu el te poţi mândri,\n Împlinită eşti în lume \n Că ai pe cine iubi !",
    ];

    const thirdVerseC = [
      `La mulți ani, ${gen}, 
      Astăzi eu închin pahare 
      Și mă rog ca soarta ta 
      Să fie plină de soare.`,
      `Să ne aduci numai bucurii 
      Noi foarte mult te iubim.
       Căci viaţa e frumoasă
       Şi tu eşti darul nostru divin.`,
      `Sa asculti de cei dragi
       Sanatate si multi bani
       Si in anul care vine
       Numai note pozitive.`,
      `Rimele azi prind viata
      Timide si sfios 
      Sa-ti spuna la multi ani 
      Te pup... copil frumos`,
      `Să rămâi în veci ${frum} 
      ${ves2} \n Bucurie pe pământ,
      Tu ești totul, înger sfânt!`,
    ];

    const first = firstVerseC[Math.floor(Math.random() * firstVerseC.length)];
    const second =
      secondVerseC[Math.floor(Math.random() * secondVerseC.length)];
    const third = thirdVerseC[Math.floor(Math.random() * thirdVerseC.length)];

    const poemC = `${first}\n${second}\n${third}\nLa multi ani fericiti ${name1}\nde la ${name2}`;

    return <div style={{ whiteSpace: 'pre-line' }}>{poemC}</div>;

  };

  const adult_poem = (name1, name2, age, gender) => {
    console.log(age);

    const firstVerse = [
      "La multi ani eu îți doresc,\n Cât mai multe toamne blânde, \n S-ai în cale ce-i firesc, \nDe iubire nu te-ascunde!",
      "La mulți ani îți spun cu drag \n  Și - ți doresc ca - n viața asta\n  Să ai bucuria - n prag,\n    Să nu simți ce e năpasta",
      " În primăvara ta să crească \n Doar flori ce năpădesc grădina, \n Surâsul să te însoţească\n Oriunde-ar fi să fii ... !",
      "Azi, fiind o zi frumoasă \n Și știind că-i ziua ta, \n În parfumul dimineții \nȚin a te felicita. ",
      "Azi în buchetul vieții tale \n A înflorit încă un trandafir,\nNoi îți dorim în a ta cale\nDoar zâmbete și multe bucurii!",
    ];
    const secondVerse = [
      ` La mulți ani cu veselie,\nSănătate pe vecie,\nMasa plină de bucate,\nDragoste pe săturate,`,
      `Astăzi, ziua fericirii \n Pentru tine a sosit,\n Îți doresc să ai în viață \nDrumul lin și aurit,`,
      "Îți doresc o viață plină \n De speranță și lumină, \n De tandrețe și iubire, \n Mult noroc și fericire!",
      "Sa-ti fie calea printre flori,\nDe roade presarata.\nAi vietii spini respingatori,\nSa nu-i simti niciodata.",
      "Bucuria lumii toata, \n Zi de zi-n usa sa-ti bata \n Bunul Dumnezeu sa-ti dea \n Tot ce iti doresti si-ai vrea",
    ];
    const thirdVerse = [
      "Flori frumoase, bucurie Să răsară-n calea ta,\n Iar acum, te rog, primește \n LA MULȚI ANI din partea mea!",
      "Toate bune ca acum \n Să fie doar lângă tine\nPeste tot în al tău drum, \nOriunde vei fi în lume!",
      "Fericirea să te poarte \n Spre al succesului moment, \n Doar de oameni buni s-ai parte \n În viitor, dar și-n prezent!",
      "Bani la greu, noroc cu carul,\nLa mulți ani și sus paharul!",
      "La multi ani eu îți doresc, \n Cât mai multe toamne blânde, \n S-ai în cale ce-i firesc,\n De iubire nu te-ascunde!",
    ];

    const first = firstVerse[Math.floor(Math.random() * firstVerse.length)];
    const second = secondVerse[Math.floor(Math.random() * secondVerse.length)];
    const third = thirdVerse[Math.floor(Math.random() * thirdVerse.length)];

    const poemA = `${first}\n${second}\n${third}\nLa multi ani fericiti ${name1}\n de la ${name2}`;

    return <div style={{ whiteSpace: 'pre-line' }}>{poemA}</div>;
    
  };

  function age_type(name1, name2, age, gender) {
    if (age < 18) {
      return child_poem(name1, name2, age, gender);
    } else if (age > 18 && age < 50) {
      return adult_poem(name1, name2, age, gender);
    } else {
      return adult_poem(name1, name2, age, gender);
    }
  }

  useEffect(() => {
    console.log(generatedPoem);
  }, [generatedPoem]);
  

  return (
    <div>
      <div>
        <label>
          Pentru cine:
          <input type="text" value={name1} readOnly />
        </label>
        <label>
          De la cine:
          <input type="text" value={name2} readOnly />
        </label>
        <label>
          Varsta pe care o implineste:
          <input type="number" value={age}  readOnly/>
        </label>
        <label>
          Gen:
          <select value={gender} readOnly>
            <option value="">-- Selecteaza --</option>
            <option value="female">Feminin</option>
            <option value="male">Masculin</option>
          </select>
        </label>
      </div>
      <div className="prpl-wrapper">
      <button type="button" className="button-purple" onClick={generatePoem} disabled={dis}>Genereaza o poezie</button>
      </div>
      {poem && (
        <div className="generated-poem"  style={{ whiteSpace: 'pre-line' }}>
          {generatedPoem}
        </div>
      )}

    </div>
  );
}

export default PoemGenerator;
