import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function Footer() {
    return (
        <footer className="bg-dark-cyan w-full flex justify-center items-center whitespace-nowrap">
            <div
                style={{ maxWidth: "75rem", minWidth: "20rem"}}
                className='w-full flex flex-row flex-wrap gap-4 py-6 px-5 items-center'
            >
                <div className="flex flex-1 flex-col justify-start items-center gap-1">
                    <span className="font-semibold text-lg">Επικοινωνία</span>
                    <span>
                        <FontAwesomeIcon icon={faPhone}/> 2101234567
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faEnvelope}/> contact@eparent.com
                    </span>
                </div>
                <div className="flex flex-1 flex-col justify-start items-center gap-1">
                    <span className="font-semibold text-lg">Η Εταιρεία</span>
                    <a href="" className="underline">Λίγα Λόγια για εμάς</a>
                    <a href="" className="underline">Συνεργάτες</a>
                </div>
                <div className="flex flex-1 flex-col justify-start items-center gap-1">
                    <div className="flex-1 p-4 flex justify-center items-center">
                        <a href="" className="flex flex-1 font-semibold text-lg underline">Συχνές Ερωτήσεις</a>
                    </div>
                </div>
                <div className="flex flex-1 flex-row justify-evenly items-center text-2xl" style={{minWidth: '12rem'}}>
                    <a href="">
                        <FontAwesomeIcon icon={faFacebook}/>
                    </a>
                    <a href="">
                        <FontAwesomeIcon icon={faInstagram}/>
                    </a>
                    <a href="">
                        <FontAwesomeIcon icon={faTwitter}/>
                    </a>
                    <a href="">
                        <FontAwesomeIcon icon={faGithub}/>
                    </a>
                </div>
                <div className="flex flex-1 flex-col justify-start items-center gap-1">
                    <span className="text-sm">© e-parent 2022. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}
