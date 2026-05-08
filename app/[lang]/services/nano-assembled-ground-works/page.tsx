import WithDictionary from '../../components/WithDictionary';
import NanoAssembledGroundWorksClient from './NanoAssembledGroundWorksClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoAssembledGroundWorksClient dict={dict} />}
    </WithDictionary>
  );
}