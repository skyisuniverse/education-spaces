import WithDictionary from '../../components/WithDictionary';
import NanoAssembledStarshipClient from './NanoAssembledStarshipClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoAssembledStarshipClient dict={dict} />}
    </WithDictionary>
  );
}