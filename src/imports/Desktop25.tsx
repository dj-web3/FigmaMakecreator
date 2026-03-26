import svgPaths from "./svg-ygaa880594";
import imgFrame1984078309 from "figma:asset/b71223439aef245797b0224fa19ebc561a39f7d3.png";
import imgFrame1984078310 from "figma:asset/1195cc13b45950250b380d547cb0364847aaa96d.png";
import imgLogo2 from "figma:asset/3c5e6ee722206ea5443c02ec7ff6671813ac7a44.png";

function Frame64() {
  return (
    <div className="bg-[#ffe6e3] content-stretch flex items-center justify-center px-[10px] py-[4px] relative rounded-[12px] shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#4a1710] text-[12px] text-nowrap tracking-[0.5px] whitespace-pre">2.5hrs</p>
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[593px]">
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#4a1710] text-[22px] text-nowrap whitespace-pre">Butter Chicken</p>
      <Frame64 />
    </div>
  );
}

function StateLayer() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <div className="h-[14px] relative shrink-0 w-[13.99px]" data-name="Vector">
            <div className="absolute inset-[-1.43%]" style={{ "--fill-0": "rgba(255, 248, 247, 1)", "--stroke-0": "rgba(255, 248, 247, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                <path d={svgPaths.p344d8c00} fill="var(--fill-0, #FFF8F7)" id="Vector" stroke="var(--stroke-0, #FFF8F7)" strokeWidth="0.4" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Edit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fe5d4d] content-stretch flex flex-col h-[40px] items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[101px]" data-name="Button">
      <StateLayer />
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame81 />
      <Button />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[181.176px] relative rounded-[5.892px] shrink-0 w-[321.6px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[5.892px] size-full" src={imgFrame1984078309} />
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex gap-[26px] items-center relative shrink-0">
      <div className="h-[3.423px] relative shrink-0 w-[12px]" data-name="-">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(74, 23, 16, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 4">
            <path d="M12 0V3.42291H0V0H12Z" fill="var(--fill-0, #4A1710)" id="-" />
          </svg>
        </div>
      </div>
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#fe5d4d] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">12</p>
      <div className="relative shrink-0 size-[12px]" data-name="+">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(74, 23, 16, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p32ef0f80} fill="var(--fill-0, #4A1710)" id="+" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0">
      <div className="content-stretch flex flex-col items-start overflow-clip px-[12px] py-[8px] relative rounded-[inherit]">
        <Frame56 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#4a1710] text-[12px] text-nowrap tracking-[0.5px] whitespace-pre">Guests</p>
      <Frame55 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame54 />
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a1710] text-[14px] tracking-[0.25px] w-[564px]">{`Butter Chicken is a beloved dish that features tender chicken pieces simmered in a rich and creamy tomato sauce. To prepare, marinate the chicken in a blend of yogurt and tikka masala spices, allowing it to soak up the flavors. After marinating, grill or sear the chicken until it's perfectly cooked. The result is a deliciously spiced dish that pairs wonderfully with rice or naan, making it a favorite for any occasion.`}</p>
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame79 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0 w-[1112px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[20px] relative rounded-[inherit] w-full">
        <Frame58 />
        <Frame80 />
      </div>
      <div aria-hidden="true" className="absolute border border-[gainsboro] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function StateLayer1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <div className="h-[14px] relative shrink-0 w-[13.99px]" data-name="Vector">
            <div className="absolute inset-[-1.43%]" style={{ "--fill-0": "rgba(255, 248, 247, 1)", "--stroke-0": "rgba(255, 248, 247, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                <path d={svgPaths.p344d8c00} fill="var(--fill-0, #FFF8F7)" id="Vector" stroke="var(--stroke-0, #FFF8F7)" strokeWidth="0.4" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Edit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#fe5d4d] content-stretch flex flex-col h-[40px] items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[101px]" data-name="Button">
      <StateLayer1 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#4a1710] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">Ingredients</p>
      <Button1 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap tracking-[0.0703px] whitespace-pre">🍗</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#4a1710] text-[14px] text-nowrap top-[0.5px] tracking-[0.1px] whitespace-pre">Chicken breast</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] left-0 text-[#b63d2f] text-[16px] text-nowrap top-0 tracking-[0.15px] whitespace-pre">2.38 kg</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="[grid-area:1_/_1] bg-[#fff8f7] place-self-stretch relative rounded-[12px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[17px] py-px relative size-full">
          <Container />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap tracking-[0.0703px] whitespace-pre">🧅</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#4a1710] text-[14px] text-nowrap top-[0.5px] tracking-[0.1px] whitespace-pre">Onions</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] left-0 text-[#b63d2f] text-[16px] text-nowrap top-0 tracking-[0.15px] whitespace-pre">780.00 g</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="[grid-area:1_/_2] bg-[#fff8f7] place-self-stretch relative rounded-[12px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[17px] py-px relative size-full">
          <Container3 />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap tracking-[0.0703px] whitespace-pre">🍞</p>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#4a1710] text-[14px] text-nowrap top-[0.5px] tracking-[0.1px] whitespace-pre">Naan bread</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] left-0 text-[#b63d2f] text-[16px] text-nowrap top-0 tracking-[0.15px] whitespace-pre">19.00 pieces</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="[grid-area:1_/_3] bg-[#fff8f7] content-stretch flex gap-[12px] h-[82px] items-center px-[17px] py-px relative rounded-[12px] shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap tracking-[0.0703px] whitespace-pre">🥛</p>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#4a1710] text-[14px] text-nowrap top-[0.5px] tracking-[0.1px] whitespace-pre">Heavy cream</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] left-0 text-[#b63d2f] text-[16px] text-nowrap top-0 tracking-[0.15px] whitespace-pre">380.00 ml</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph6 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="[grid-area:1_/_4] bg-[#fff8f7] content-stretch flex gap-[12px] h-[82px] items-center px-[17px] py-px relative rounded-[12px] shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap tracking-[0.0703px] whitespace-pre">🥛</p>
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#4a1710] text-[14px] text-nowrap top-[0.5px] tracking-[0.1px] whitespace-pre">Yogurt</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] left-0 text-[#b63d2f] text-[16px] text-nowrap top-0 tracking-[0.15px] whitespace-pre">970.00 ml</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph8 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="[grid-area:2_/_1] bg-[#fff8f7] content-stretch flex gap-[12px] h-[82px] items-center px-[17px] py-px relative rounded-[12px] shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap tracking-[0.0703px] whitespace-pre">🧄</p>
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#4a1710] text-[14px] text-nowrap top-[0.5px] tracking-[0.1px] whitespace-pre">Orange-garlic paste</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] left-0 text-[#b63d2f] text-[16px] text-nowrap top-0 tracking-[0.15px] whitespace-pre">114.00 g</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph10 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="[grid-area:2_/_2] bg-[#fff8f7] content-stretch flex gap-[12px] h-[82px] items-center px-[17px] py-px relative rounded-[12px] shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap tracking-[0.0703px] whitespace-pre">🍚</p>
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#4a1710] text-[14px] text-nowrap top-[0.5px] tracking-[0.1px] whitespace-pre">Rice</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] left-0 text-[#b63d2f] text-[16px] text-nowrap top-0 tracking-[0.15px] whitespace-pre">950.00 g</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph12 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="[grid-area:2_/_3] bg-[#fff8f7] content-stretch flex gap-[12px] h-[82px] items-center px-[17px] py-px relative rounded-[12px] shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap tracking-[0.0703px] whitespace-pre">🍅</p>
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#4a1710] text-[14px] text-nowrap top-[0.5px] tracking-[0.1px] whitespace-pre">Tomatoes</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] left-0 text-[#b63d2f] text-[16px] text-nowrap top-0 tracking-[0.15px] whitespace-pre">1429.00 g</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph14 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="[grid-area:2_/_4] bg-[#fff8f7] content-stretch flex gap-[12px] h-[82px] items-center px-[17px] py-px relative rounded-[12px] shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap tracking-[0.0703px] whitespace-pre">🌶️</p>
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#4a1710] text-[14px] text-nowrap top-[0.5px] tracking-[0.1px] whitespace-pre">Tikka masala spices</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] left-0 text-[#b63d2f] text-[16px] text-nowrap top-0 tracking-[0.15px] whitespace-pre">95.00 g</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph16 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="[grid-area:3_/_1] bg-[#fff8f7] content-stretch flex gap-[12px] h-[82px] items-center px-[17px] py-px relative rounded-[12px] shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap tracking-[0.0703px] whitespace-pre">🌿</p>
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#4a1710] text-[14px] text-nowrap top-[0.5px] tracking-[0.1px] whitespace-pre">Cilantro</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] left-0 text-[#b63d2f] text-[16px] text-nowrap top-0 tracking-[0.15px] whitespace-pre">57.00 g</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="[grid-area:3_/_2] bg-[#fff8f7] content-stretch flex gap-[12px] h-[82px] items-center px-[17px] py-px relative rounded-[12px] shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-[278px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container5 />
      <Container8 />
      <Container11 />
      <Container14 />
      <Container17 />
      <Container20 />
      <Container23 />
      <Container26 />
      <Container29 />
    </div>
  );
}

function Frame87() {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[20px] relative w-full">
          <Frame61 />
          <Container30 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffd3d3] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function StateLayer2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <div className="h-[14px] relative shrink-0 w-[13.99px]" data-name="Vector">
            <div className="absolute inset-[-1.43%]" style={{ "--fill-0": "rgba(255, 248, 247, 1)", "--stroke-0": "rgba(255, 248, 247, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                <path d={svgPaths.p344d8c00} fill="var(--fill-0, #FFF8F7)" id="Vector" stroke="var(--stroke-0, #FFF8F7)" strokeWidth="0.4" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Edit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#fe5d4d] content-stretch flex flex-col h-[40px] items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[101px]" data-name="Button">
      <StateLayer2 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#4a1710] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">Tutorial Video</p>
      <Button2 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute left-[286px] size-[67px] top-[146px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67 67">
        <g id="Frame 1984078335">
          <path d={svgPaths.p2954d980} fill="var(--fill-0, #FFF8F7)" id="Vector" />
          <path d={svgPaths.p1bdb8f0} fill="var(--fill-0, #FFF8F7)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[360.55px] overflow-clip relative rounded-[11.725px] shrink-0 w-[640px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[11.725px]">
        <div className="absolute bg-[#fff8f7] inset-0 rounded-[11.725px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[11.725px] size-full" src={imgFrame1984078310} />
        <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0 rounded-[11.725px]" />
      </div>
      <Frame4 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[20px] relative w-full">
          <Frame59 />
          <Frame3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path clipRule="evenodd" d={svgPaths.p18edec00} fill="var(--fill-0, #FFF8F7)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <Icon />
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Edit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditButton() {
  return (
    <div className="bg-[#fe5d4d] content-stretch flex flex-col h-[40px] items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[101px]" data-name="EditButton">
      <StateLayer3 />
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#4a1710] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">Steps Timeline</p>
      <EditButton />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">0m</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">15m</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">30m</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">1h</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">1h 15m</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">1h 30m</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">2h</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">2h 30m</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">3hrs</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">3hrs 30m</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">4hrs</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">4hrs 30m</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-center text-nowrap whitespace-pre">5hrs</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #666666)" id="Ellipse 736" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[56px] items-center pl-[81px] pr-0 py-0 relative shrink-0 w-[1132px]">
      <Frame5 />
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame9 />
      <Frame10 />
      <Frame11 />
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame17 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[#c2c2c2] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0 w-[306px]">
      <div aria-hidden="true" className="absolute border border-[#adadad] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-nowrap whitespace-pre">01: Marinate the Chicken</p>
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-nowrap whitespace-pre">{`1h 15mins. `}</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-[#c2c2c2] content-stretch flex gap-[2px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0 w-[138px]">
      <div aria-hidden="true" className="absolute border border-[#adadad] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-nowrap whitespace-pre">02: Grill or Sear Ch.</p>
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-nowrap whitespace-pre">{`30mins. `}</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[#c2c2c2] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0 w-[267px]">
      <div aria-hidden="true" className="absolute border border-[#adadad] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-nowrap whitespace-pre">03: Prepare the Tomato Base</p>
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-nowrap whitespace-pre">{`30mins. `}</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="basis-0 bg-[#c2c2c2] grow min-h-px min-w-px relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#adadad] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-nowrap whitespace-pre">04: Blend into Smooth Gravy</p>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#c2c2c2] content-stretch flex items-center justify-center p-[10px] relative rounded-[8px] shrink-0 w-[238px]">
      <div aria-hidden="true" className="absolute border border-[#adadad] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-nowrap whitespace-pre">05: Simmer with Cream</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="basis-0 bg-[#c2c2c2] grow min-h-px min-w-px relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#adadad] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#666666] text-[10px] text-nowrap whitespace-pre">06: Add Chicken and Finish</p>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#e8e8e8] content-stretch flex items-center p-[4px] relative rounded-[8px] shrink-0 w-[1409px]">
      <Frame29 />
      <Frame36 />
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[10px] text-nowrap text-white tracking-[0.25px]">
        <p className="leading-[20px] whitespace-pre">Executive Chef</p>
      </div>
      <Frame23 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold gap-[4px] items-start leading-[normal] relative shrink-0 text-[10px] text-nowrap whitespace-pre">
      <p className="relative shrink-0 text-[#666666]">01: Marinate the Chicken</p>
      <p className="relative shrink-0 text-[#0077ff]">{`30mins. `}</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 1984078335">
          <path d={svgPaths.p26e66d70} fill="var(--fill-0, #0077FF)" id="Vector" />
          <path d={svgPaths.pc2a100} fill="var(--fill-0, #0077FF)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame38() {
  return (
    <div className="absolute bg-[#ffccf5] content-stretch flex gap-[8px] items-start left-[4px] p-[10px] rounded-[8px] top-[4px] w-[161px]">
      <div aria-hidden="true" className="absolute border border-[#ffa1ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame53 />
      <Frame37 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold gap-[4px] items-start leading-[normal] relative shrink-0 text-[10px] text-nowrap whitespace-pre">
      <p className="relative shrink-0 text-[#666666]">03: Prepare the Tomato Base</p>
      <p className="relative shrink-0 text-[#0077ff]">{`30mins. `}</p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 1984078335">
          <path d={svgPaths.p26e66d70} fill="var(--fill-0, #0077FF)" id="Vector" />
          <path d={svgPaths.pc2a100} fill="var(--fill-0, #0077FF)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute bg-[#ffccf5] content-stretch flex gap-[8px] items-start left-[165px] p-[10px] rounded-[8px] top-[4px]">
      <div aria-hidden="true" className="absolute border border-[#ffa1ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame46 />
      <Frame39 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-[#e8e8e8] h-[57px] relative rounded-[8px] shrink-0 w-[1409px]">
      <Frame38 />
      <Frame40 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#323232] text-[10px] tracking-[0.25px] w-[77px]">
        <p className="leading-[20px]">Station Chef</p>
      </div>
      <Frame24 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold gap-[4px] items-start leading-[normal] relative shrink-0 text-[10px] text-nowrap whitespace-pre">
      <p className="relative shrink-0 text-[#666666]">02: Grill or Sear Chicken</p>
      <p className="relative shrink-0 text-[#0077ff]">{`30mins. `}</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 1984078335">
          <path d={svgPaths.p26e66d70} fill="var(--fill-0, #0077FF)" id="Vector" />
          <path d={svgPaths.pc2a100} fill="var(--fill-0, #0077FF)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame63() {
  return (
    <div className="absolute bg-[#ffccf5] content-stretch flex gap-[8px] items-start left-[165px] p-[10px] rounded-[8px] top-[4px]">
      <div aria-hidden="true" className="absolute border border-[#ffa1ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame47 />
      <Frame41 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#e8e8e8] h-[58px] relative rounded-[8px] shrink-0 w-[1409px]">
      <Frame63 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#323232] text-[10px] tracking-[0.25px] w-[77px]">
        <p className="leading-[20px]">Sous Chef</p>
      </div>
      <Frame25 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold gap-[4px] items-start leading-[normal] relative shrink-0 text-[10px] text-nowrap whitespace-pre">
      <p className="relative shrink-0 text-[#666666]">04: Blend into Smooth Gravy</p>
      <p className="relative shrink-0 text-[#0077ff]">{`30mins. `}</p>
    </div>
  );
}

function Frame65() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 1984078335">
          <path d={svgPaths.p26e66d70} fill="var(--fill-0, #0077FF)" id="Vector" />
          <path d={svgPaths.pc2a100} fill="var(--fill-0, #0077FF)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame66() {
  return (
    <div className="absolute bg-[#ffccf5] content-stretch flex gap-[8px] items-start left-[306px] p-[10px] rounded-[8px] top-[4px]">
      <div aria-hidden="true" className="absolute border border-[#ffa1ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame48 />
      <Frame65 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#e8e8e8] h-[58px] relative rounded-[8px] shrink-0 w-[1409px]">
      <Frame66 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#323232] text-[10px] tracking-[0.25px] w-[77px]">
        <p className="leading-[20px]">Junior Cook</p>
      </div>
      <Frame26 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold gap-[4px] items-start leading-[normal] relative shrink-0 text-[10px] text-nowrap whitespace-pre">
      <p className="relative shrink-0 text-[#666666]">05: Simmer with Cream</p>
      <p className="relative shrink-0 text-[#0077ff]">{`30mins. `}</p>
    </div>
  );
}

function Frame67() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 1984078335">
          <path d={svgPaths.p26e66d70} fill="var(--fill-0, #0077FF)" id="Vector" />
          <path d={svgPaths.pc2a100} fill="var(--fill-0, #0077FF)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame68() {
  return (
    <div className="absolute bg-[#ffccf5] content-stretch flex gap-[8px] items-start left-[467px] p-[10px] rounded-[8px] top-[4px]">
      <div aria-hidden="true" className="absolute border border-[#ffa1ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame49 />
      <Frame67 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#e8e8e8] h-[58px] relative rounded-[8px] shrink-0 w-[1409px]">
      <Frame68 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#323232] text-[10px] tracking-[0.25px] w-[77px]">
        <p className="leading-[20px]">Station Chef</p>
      </div>
      <Frame27 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold gap-[4px] items-start leading-[normal] relative shrink-0 text-[10px] text-nowrap whitespace-pre">
      <p className="relative shrink-0 text-[#666666]">06: Add Chicken and Finish</p>
      <p className="relative shrink-0 text-[#0077ff]">{`30mins. `}</p>
    </div>
  );
}

function Frame70() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 1984078335">
          <path d={svgPaths.p26e66d70} fill="var(--fill-0, #0077FF)" id="Vector" />
          <path d={svgPaths.pc2a100} fill="var(--fill-0, #0077FF)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame78() {
  return (
    <div className="absolute bg-[#ffccf5] content-stretch flex gap-[8px] items-start left-[582px] p-[10px] rounded-[8px] top-[4px]">
      <div aria-hidden="true" className="absolute border border-[#ffa1ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame50 />
      <Frame70 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#e8e8e8] h-[58px] relative rounded-[8px] shrink-0 w-[1409px]">
      <Frame78 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#323232] text-[10px] tracking-[0.25px] w-[77px]">
        <p className="leading-[20px]">{`Trainee `}</p>
      </div>
      <Frame28 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0 w-[1112px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[20px] relative rounded-[inherit] w-full">
        <Frame69 />
        <Frame22 />
        <Frame35 />
        <Frame30 />
        <Frame31 />
        <Frame32 />
        <Frame33 />
        <Frame34 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#fe5d4d] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path clipRule="evenodd" d={svgPaths.p18edec00} fill="var(--fill-0, #FFF8F7)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <Icon1 />
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Edit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditButton1() {
  return (
    <div className="bg-[#fe5d4d] content-stretch flex flex-col h-[40px] items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[101px]" data-name="EditButton">
      <StateLayer4 />
    </div>
  );
}

function Frame89() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#4a1710] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">Cooking Steps</p>
      <EditButton1 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#4a1710] text-[14px] text-nowrap whitespace-pre">1</p>
    </div>
  );
}

function Frame72() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#4a1710] text-[11px] text-nowrap tracking-[0.5px] whitespace-pre">Station Chef</p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#b63d2f] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">{`Marinate the Chicken `}</p>
      <Frame72 />
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Frame71 />
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#4a1710] text-[16px] tracking-[0.5px] w-[549px]">Combine 1 cup of yogurt with 2 tablespoons of tikka masala spices. Coat the chicken thoroughly and let it marinate for at least 2 hours in the refrigerator for the best flavor.</p>
    </div>
  );
}

function Frame57() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start relative w-full">
        <Container31 />
        <Container32 />
      </div>
    </div>
  );
}

function StateLayer5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <div className="h-[12.001px] relative shrink-0 w-[10.667px]" data-name="Vector">
            <div className="absolute inset-[-5.56%_-6.25%]" style={{ "--fill-0": "rgba(254, 93, 77, 1)", "--stroke-0": "rgba(254, 93, 77, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
                <path d={svgPaths.p3999bcf0} fill="var(--fill-0, #FE5D4D)" id="Vector" stroke="var(--stroke-0, #FE5D4D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fe5d4d] text-[16px] text-center text-nowrap tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Tutorial</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[42px] relative rounded-[100px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border border-[transparent] border-solid content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[inherit]">
        <StateLayer5 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#fe5d4d] border-solid inset-0 pointer-events-none rounded-[101px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-[#fff8f7] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-start justify-end p-[17px] relative w-full">
          <Frame57 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#4a1710] text-[14px] text-nowrap whitespace-pre">2</p>
    </div>
  );
}

function Frame90() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#4a1710] text-[11px] text-nowrap tracking-[0.5px] whitespace-pre">Sous Chef</p>
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#b63d2f] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">Grill or Sear Chicken</p>
      <Frame90 />
    </div>
  );
}

function Container35() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Frame73 />
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#4a1710] text-[16px] tracking-[0.5px] w-[549px]">Combine 1 cup of yogurt with 2 tablespoons of tikka masala spices to marinate 1 pound of chicken. Let it sit for at least 30 minutes. Grill the chicken over medium heat for about 6-8 minutes on each side until fully cooked.</p>
    </div>
  );
}

function Frame91() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start relative w-full">
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function StateLayer6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <div className="h-[12.001px] relative shrink-0 w-[10.667px]" data-name="Vector">
            <div className="absolute inset-[-5.56%_-6.25%]" style={{ "--fill-0": "rgba(254, 93, 77, 1)", "--stroke-0": "rgba(254, 93, 77, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
                <path d={svgPaths.p3999bcf0} fill="var(--fill-0, #FE5D4D)" id="Vector" stroke="var(--stroke-0, #FE5D4D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fe5d4d] text-[16px] text-center text-nowrap tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Tutorial</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[42px] relative rounded-[100px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border border-[transparent] border-solid content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[inherit]">
        <StateLayer6 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#fe5d4d] border-solid inset-0 pointer-events-none rounded-[101px]" />
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[#fff8f7] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-start justify-end p-[17px] relative w-full">
          <Frame91 />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#4a1710] text-[14px] text-nowrap whitespace-pre">3</p>
    </div>
  );
}

function Frame92() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#4a1710] text-[11px] text-nowrap tracking-[0.5px] whitespace-pre">Station Chef</p>
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#b63d2f] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">Prepare the Tomato Base</p>
      <Frame92 />
    </div>
  );
}

function Container38() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Frame74 />
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#4a1710] text-[16px] tracking-[0.5px] w-[549px]">To prepare a tomato base, start by sautéing chopped onions in olive oil until golden. Add minced garlic and cook for another minute. Then, stir in diced tomatoes, a pinch of salt, and your favorite herbs. Let it simmer for about 20 minutes, stirring occasionally, until it thickens. This will create a rich and flavorful base for your dish.</p>
    </div>
  );
}

function Frame93() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start relative w-full">
        <Container37 />
        <Container38 />
      </div>
    </div>
  );
}

function StateLayer7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <div className="h-[12.001px] relative shrink-0 w-[10.667px]" data-name="Vector">
            <div className="absolute inset-[-5.56%_-6.25%]" style={{ "--fill-0": "rgba(254, 93, 77, 1)", "--stroke-0": "rgba(254, 93, 77, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
                <path d={svgPaths.p3999bcf0} fill="var(--fill-0, #FE5D4D)" id="Vector" stroke="var(--stroke-0, #FE5D4D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fe5d4d] text-[16px] text-center text-nowrap tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Tutorial</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[42px] relative rounded-[100px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border border-[transparent] border-solid content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[inherit]">
        <StateLayer7 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#fe5d4d] border-solid inset-0 pointer-events-none rounded-[101px]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[#fff8f7] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-start justify-end p-[17px] relative w-full">
          <Frame93 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#4a1710] text-[14px] text-nowrap whitespace-pre">4</p>
    </div>
  );
}

function Frame94() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#4a1710] text-[11px] text-nowrap tracking-[0.5px] whitespace-pre">Junior Cook</p>
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#b63d2f] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">Blend into Smooth Gravy</p>
      <Frame94 />
    </div>
  );
}

function Container41() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Frame75 />
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#4a1710] text-[16px] tracking-[0.5px] w-[549px]">Blend yogurt with tikka masala spices to create a smooth marinade for the chicken. Allow it to marinate for at least 30 minutes before cooking.</p>
    </div>
  );
}

function Frame95() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start relative w-full">
        <Container40 />
        <Container41 />
      </div>
    </div>
  );
}

function StateLayer8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <div className="h-[12.001px] relative shrink-0 w-[10.667px]" data-name="Vector">
            <div className="absolute inset-[-5.56%_-6.25%]" style={{ "--fill-0": "rgba(254, 93, 77, 1)", "--stroke-0": "rgba(254, 93, 77, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
                <path d={svgPaths.p3999bcf0} fill="var(--fill-0, #FE5D4D)" id="Vector" stroke="var(--stroke-0, #FE5D4D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fe5d4d] text-[16px] text-center text-nowrap tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Tutorial</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[42px] relative rounded-[100px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border border-[transparent] border-solid content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[inherit]">
        <StateLayer8 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#fe5d4d] border-solid inset-0 pointer-events-none rounded-[101px]" />
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#fff8f7] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-start justify-end p-[17px] relative w-full">
          <Frame95 />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#4a1710] text-[14px] text-nowrap whitespace-pre">5</p>
    </div>
  );
}

function Frame96() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#4a1710] text-[11px] text-nowrap tracking-[0.5px] whitespace-pre">Station Chef</p>
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#b63d2f] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">Simmer with Cream</p>
      <Frame96 />
    </div>
  );
}

function Container44() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Frame76 />
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#4a1710] text-[16px] tracking-[0.5px] w-[549px]">Combine yogurt with tikka masala spices to marinate the chicken, then simmer it with cream for a rich butter chicken dish.</p>
    </div>
  );
}

function Frame97() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start relative w-full">
        <Container43 />
        <Container44 />
      </div>
    </div>
  );
}

function StateLayer9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <div className="h-[12.001px] relative shrink-0 w-[10.667px]" data-name="Vector">
            <div className="absolute inset-[-5.56%_-6.25%]" style={{ "--fill-0": "rgba(254, 93, 77, 1)", "--stroke-0": "rgba(254, 93, 77, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
                <path d={svgPaths.p3999bcf0} fill="var(--fill-0, #FE5D4D)" id="Vector" stroke="var(--stroke-0, #FE5D4D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fe5d4d] text-[16px] text-center text-nowrap tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Tutorial</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[42px] relative rounded-[100px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border border-[transparent] border-solid content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[inherit]">
        <StateLayer9 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#fe5d4d] border-solid inset-0 pointer-events-none rounded-[101px]" />
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-[#fff8f7] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-start justify-end p-[17px] relative w-full">
          <Frame97 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Container">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#4a1710] text-[14px] text-nowrap whitespace-pre">6</p>
    </div>
  );
}

function Frame98() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#4a1710] text-[11px] text-nowrap tracking-[0.5px] whitespace-pre">Trainee</p>
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#b63d2f] text-[16px] text-nowrap tracking-[0.15px] whitespace-pre">Add Chicken and Finish</p>
      <Frame98 />
    </div>
  );
}

function Container47() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Frame77 />
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#4a1710] text-[16px] tracking-[0.5px] w-[549px]">Combine yogurt with tikka masala spices to marinate the chicken, then cook it until tender for a delicious butter chicken.</p>
    </div>
  );
}

function Frame99() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start relative w-full">
        <Container46 />
        <Container47 />
      </div>
    </div>
  );
}

function StateLayer10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-[16px] pr-[24px] py-[10px] relative size-full">
          <div className="h-[12.001px] relative shrink-0 w-[10.667px]" data-name="Vector">
            <div className="absolute inset-[-5.56%_-6.25%]" style={{ "--fill-0": "rgba(254, 93, 77, 1)", "--stroke-0": "rgba(254, 93, 77, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
                <path d={svgPaths.p3999bcf0} fill="var(--fill-0, #FE5D4D)" id="Vector" stroke="var(--stroke-0, #FE5D4D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fe5d4d] text-[16px] text-center text-nowrap tracking-[0.25px]">
            <p className="leading-[20px] whitespace-pre">Tutorial</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[42px] relative rounded-[100px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border border-[transparent] border-solid content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[inherit]">
        <StateLayer10 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#fe5d4d] border-solid inset-0 pointer-events-none rounded-[101px]" />
    </div>
  );
}

function Container48() {
  return (
    <div className="bg-[#fff8f7] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-start justify-end p-[17px] relative w-full">
          <Frame99 />
          <Button8 />
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Container33 />
      <Container36 />
      <Container39 />
      <Container42 />
      <Container45 />
      <Container48 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[20px] relative w-full">
          <Frame89 />
          <Frame60 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Frame62() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[20px] top-[137px] w-[1112px]">
      <Frame82 />
      <Frame87 />
      <Frame45 />
      <Frame88 />
      <Frame44 />
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative rounded-[100px] shrink-0 w-[64px]">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] text-center text-nowrap tracking-[0.5px]">
        <p className="leading-[16px] whitespace-pre">Chef</p>
      </div>
    </div>
  );
}

function Frame84() {
  return (
    <div className="bg-[#ffd6d1] content-stretch flex items-center justify-center px-[10px] py-[4px] relative rounded-[100px] shrink-0 w-[64px]">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#4a1710] text-[12px] text-center text-nowrap tracking-[0.5px]">
        <p className="leading-[16px] whitespace-pre">Steps</p>
      </div>
    </div>
  );
}

function Frame85() {
  return (
    <div className="bg-[#fff8f7] content-stretch flex items-center relative rounded-[100px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Frame83 />
      <Frame84 />
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[24px] min-w-full relative shrink-0 text-[#b63d2f] text-[16px] tracking-[0.15px] w-[min-content]">Steps Timeline</p>
      <Frame85 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start justify-center left-[19px] top-[37px] w-[248px]">
      <Frame86 />
      <div className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[616px] leading-[20px] relative shrink-0 text-[#4a1710] text-[0px] text-[14px] tracking-[0.25px] w-[248px]">
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">1. Marinate the Chicken</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">(Station Chef)</p>
        <p className="mb-0">Combine 1 cup of yogurt with 2 tablespoons of tikka masala spices.</p>
        <p className="mb-0">Coat the chicken thoroughly and marinate for at least 2 hours in the refrigerator.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">2. Grill or Sear Chicken</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">(Sous Chef)</p>
        <p className="mb-0">Use the same mix: 1 cup yogurt + 2 tablespoons tikka masala spices to marinate 1 pound of chicken for at least 30 minutes.</p>
        <p className="mb-0">Grill on medium heat for 6–8 minutes on each side until fully cooked.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">3. Prepare the Tomato Base</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">(Station Chef)</p>
        <p className="mb-0">Sauté chopped onions in olive oil until golden. Add minced garlic and cook for another minute.</p>
        <p className="mb-0">Add diced tomatoes, salt, and herbs.</p>
        <p className="mb-0">Simmer for ~20 minutes, stirring occasionally, until thickened.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">4. Blend into Smooth Gravy</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">(Junior Cook)</p>
        <p className="mb-0">Blend yogurt with tikka masala spices to make a smooth marinade.</p>
        <p className="mb-0">Let it marinate for at least 30 minutes before cooking.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">5. Simmer with Cream</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">(Station Chef)</p>
        <p className="mb-0">Combine yogurt with tikka masala spices to marinate the chicken, then simmer it with cream to make a rich butter chicken sauce.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">6. Add Chicken and Finish</p>
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium mb-0 text-[#b63d2f] tracking-[0.1px]">(Trainee)</p>
        <p>Combine yogurt with tikka masala spices to marinate the chicken, then cook it until tender to finish the butter chicken dish.</p>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute bg-[#fff8f7] border-[#ffd6d1] border-[0px_0px_0px_1px] border-solid h-[870px] right-0 top-[85px] w-[288px]">
      <div className="absolute flex inset-[1.38%_4.24%_96.34%_calc(88.89%-1px)] items-center justify-center">
        <div className="flex-none rotate-[45deg] size-[14px]">
          <div className="relative size-full" data-name="icon">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(254, 93, 77, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                <path d={svgPaths.p2ccb20} fill="var(--fill-0, #FE5D4D)" id="icon" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame52 />
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add">
          <path d={svgPaths.p2a6e0600} fill="var(--fill-0, #4A1710)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Mic() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mic">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mic">
          <path d={svgPaths.p31d9a420} fill="var(--fill-0, #4A1710)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Add />
      <Mic />
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#858585] text-[12px] tracking-[0.4px] w-[min-content]">
        <p className="leading-[16px]">
          What would you like to change in this?
          <br aria-hidden="true" />
          <br aria-hidden="true" />
          Ex: Grill for 25mins only
        </p>
      </div>
      <Frame51 />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="Search bar">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-start p-[8px] relative w-full">
          <Content />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffeae7] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <SearchBar />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#fff8f7] left-[1152px] top-[922px] w-[288px]">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[16px] relative rounded-[inherit] w-full">
        <Frame1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#ffd6d1] border-[1px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#fe5d4d] text-[20px] text-center text-nowrap">
        <p className="leading-[28px] whitespace-pre">Cook’s View</p>
      </div>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-3px]" style={{ "--stroke-0": "rgba(254, 93, 77, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 3">
            <line id="Line 99" stroke="var(--stroke-0, #FE5D4D)" strokeLinecap="round" strokeWidth="3" x1="1.5" x2="118.5" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame101() {
  return (
    <div className="absolute content-stretch flex gap-[20px] items-start left-[185px] top-[calc(50%-0.5px)] translate-y-[-50%]">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#4a1710] text-[20px] text-center text-nowrap">
        <p className="leading-[28px] whitespace-pre">Creator’s View</p>
      </div>
      <Frame100 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute bg-[#fff8f7] h-[85px] left-0 top-0 w-[1440px]">
      <div aria-hidden="true" className="absolute border border-[#ffd6d1] border-solid inset-[-1px] pointer-events-none shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]" />
      <Frame101 />
      <div className="absolute h-[30px] left-[calc(50%-649.5px)] top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%] w-[101px]" data-name="logo 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo2} />
      </div>
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 25">
      <Frame43 />
      <Frame />
      <Frame42 />
      <Frame62 />
    </div>
  );
}