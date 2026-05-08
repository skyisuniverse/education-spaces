import WithDictionary from '../../components/WithDictionary';
import StarshipNanoAssemblyClient from './StarshipNanoAssemblyClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <StarshipNanoAssemblyClient dict={dict} />}
    </WithDictionary>
  );
}