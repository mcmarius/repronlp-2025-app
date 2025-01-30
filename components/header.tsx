import Image from 'next/image'

export default function Header() {
    return (
    <div id="header">
      <Image src='/img/LITW-logo2020.png' id='logo'
                 alt='The Lab in the Wild logo showing an Earth globe and the name of the site in green colors.'
                 width={320} height={99}
      />
      <div className='separator'>&nbsp;</div>
    </div>
    );
}
