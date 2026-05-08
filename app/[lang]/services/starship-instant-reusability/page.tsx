import WithDictionary from '../../components/WithDictionary';
import StarshipInstantReusabilityClient from './StarshipInstantReusabilityClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <StarshipInstantReusabilityClient dict={dict} />}
    </WithDictionary>
  );
}