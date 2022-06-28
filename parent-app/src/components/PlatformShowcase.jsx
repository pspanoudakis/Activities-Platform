import React from "react";
import { useHasMaxWidth } from "../hooks/useHasMaxWidth";
import { MD_PXLIMIT } from "../utils/deviceConstants";

export function PlatformShowcase() {

    const mdDevice = useHasMaxWidth(MD_PXLIMIT)

    // experimental
    const smDevice = useHasMaxWidth(500)

    return (
        <div className={`w-full flex flex-col py-4 ${mdDevice ? 'gap-6' : ''}`}>
            <div className="w-full flex flex-row gap-6 items-center justify-center flex-wrap">
                <div
                    className="rounded-3xl"
                    style={{
                        width: `${mdDevice ? '17rem' : '22rem'}`,
                        height: `${mdDevice ? '18rem' : '25rem'}`,
                        backgroundImage: "url('https://cdn2.momjunction.com/wp-content/uploads/2014/11/101-Beautiful-Parenting-Quotes-That-Reflect-Love-And-Care-624x702.jpg.webp')",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                />
                <div
                    className="flex-1 flex flex-col gap-3 px-3"
                    style={{minWidth: '18rem'}}
                >
                    <span className={`text-4xl font-light ${mdDevice ? 'text-center' : ''}`}>Για τους Γονείς</span>
                    <span className={`flex-1 break-normal ${smDevice ? 'text-center' : ''}`}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi expedita aut, dicta laborum modi eum est. Labore corrupti veniam beatae soluta, quia iusto nisi eum delectus! A voluptate vel labore?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi expedita aut, dicta laborum modi eum est. Labore corrupti veniam beatae soluta, quia iusto nisi eum delectus! A voluptate vel labore?
                    </span>
                </div>
            </div>
            <div className="w-full flex flex-row gap-6 items-center justify-center flex-wrap-reverse">
                <div
                    className="flex-1 flex flex-col gap-3 px-3"
                    style={{minWidth: '18rem'}}
                >
                    <span className={`text-4xl font-light ${mdDevice ? 'text-center' : ''}`}>Γίνε Συνεργάτης</span>
                    <span className={`flex-1 break-normal ${smDevice ? 'text-center' : ''}`}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi expedita aut, dicta laborum modi eum est. Labore corrupti veniam beatae soluta, quia iusto nisi eum delectus! A voluptate vel labore?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi expedita aut, dicta laborum modi eum est. Labore corrupti veniam beatae soluta, quia iusto nisi eum delectus! A voluptate vel labore?
                    </span>
                </div>
                <div
                    className="rounded-3xl"
                    style={{
                        width: `${mdDevice ? '17rem' : '22rem'}`,
                        height: `${mdDevice ? '18rem' : '25rem'}`,
                        backgroundImage: "url('https://cdn10.phillymag.com/wp-content/uploads/sites/3/2018/01/kidsports.jpg')",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                />
                
            </div>
        </div>
    )    
}
