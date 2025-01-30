import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
    <div id="header">
      <div className="row">
      <Link href="/" className="col-4">
      <Image src='/img/LITW-logo2020.png' id='logo'
                 alt='The Lab in the Wild logo showing an Earth globe and the name of the site in green colors.'
                 width={220} height={69}
      />
      </Link>
      <div className="col-4 ml-20 mt-5"><h3><a href="https://labinthewild.org/">Lab in the Wild</a> clone for HumEval</h3></div>
      </div>
      <div className='separator'>&nbsp;</div>
    </div>
    );
}
