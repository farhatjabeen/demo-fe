import React, { useEffect } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { goToTop } from '../../utils/helper'

const TermsOfUSe = () => {
  useEffect(() => {
    goToTop()
  }, [])
  return (
    <>
      <div className="relative flex justify-center">
        <button
          className="cursor-pointer text-2xl absolute left-20 top-2"
          onClick={() => window.history.back()}
        >
          <IoMdArrowBack />
        </button>
        <h1 className="text-3xl font-bold text-center">Terms of use</h1>
      </div>
      <div className="px-20 lg:px-40 lg:pt-20 pt-10">
        <div>
          <h1 className="text-2xl text-primary-color font-bold mb-4">Acceptance of Terms</h1>
          <p className="text-xl mb-4 text-light-black">
            By using the Ilost website, you acknowledge that you have read, understood, and agree to
            be bound by these Terms of Use. Ilost reserves the right to modify, update, or revise
            these terms at any time. It is your responsibility to review these terms periodically.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-primary-color font-bold mb-4">Use of the Service</h1>
          <p className="text-xl mb-4 text-light-black">
            You agree to use the Service only for lawful purposes and in accordance with these Terms
            of Use. You are prohibited from violating or attempting to violate the security of the
            Service, including, but not limited to:
          </p>
          <ul className="text-xl  text-light-black list-disc ml-6 mb-4">
            <li>
              Accessing data not intended for you or logging into a server or account that you are
              not authorized to access.
            </li>
            <li>
              Attempting to probe, scan, or test the vulnerability of the Service or any associated
              system or network.
            </li>
            <li>
              Interfering with, disrupting, or attempting to gain unauthorized access to any
              computer network.
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl text-primary-color font-bold mb-4">User Accounts</h1>
          <p className="text-xl  text-light-black mb-4">
            To access certain features of the Service, you may be required to create an account. You
            are responsible for maintaining the confidentiality of your account information,
            including your password, and for all activity that occurs under your account.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-primary-color font-bold mb-4">Privacy</h1>
          <p className="text-xl mb-4 text-light-black">
            Your use of the Service is also governed by our Privacy Policy, which can be found [link
            to Privacy Policy]. By using the Service, you consent to the terms of our Privacy
            Policy.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-primary-color font-bold mb-4">Intellectual Property</h1>
          <p className="text-xl mb-4 text-light-black">
            All content on the Ilost website, including but not limited to text, graphics, logos,
            images, and software, is the property of Ilost and is protected by intellectual property
            laws. You may not modify, reproduce, distribute, or display any part of the Service
            without the express written consent of Ilost.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-primary-color font-bold mb-4">Disclaimer of Warranties</h1>
          <p className="text-xl mb-4 text-light-black">
            The Service is provided on an "as-is" and "as available" basis. Ilost makes no
            warranties, expressed or implied, and hereby disclaims and negates all other warranties.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-primary-color font-bold mb-4">Limitation of Liability</h1>
          <p className="text-xl mb-4 text-light-black">
            In no event shall Ilost or its affiliates be liable for any indirect, incidental,
            special, or consequential damages arising out of or in any way connected with the use of
            the Service.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-primary-color font-bold mb-4">Governing</h1>
          <p className="text-xl mb-4 text-light-black">
            These Terms of Use are governed by and construed in accordance with the laws of [Your
            Jurisdiction], without regard to its conflict of law principles.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-primary-color font-bold mb-4">Contact Information</h1>
          <p className="text-xl mb-20 text-light-black">
            If you have any questions or concerns regarding these Terms of Use, you may contact us
            at..
          </p>
        </div>
      </div>
    </>
  )
}

export default TermsOfUSe
