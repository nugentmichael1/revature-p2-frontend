type Props = {
  src: string;
};

const Testimonial = ({ src }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-md border-2 border-slate-200 p-8'>
      <img src={src} alt='alumni' className='w-40 rounded-full' />
      <h3 className='text-xl font-bold'>This is the Title 1</h3>
      <p>
        Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur
        ac venenatis facilisi est. Eget ac turpis id.
      </p>
    </div>
  );
};

export default Testimonial;
