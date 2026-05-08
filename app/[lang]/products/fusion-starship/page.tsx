import WithDictionary from '../../components/WithDictionary';
import FusionStarshipClient from './FusionStarshipClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <FusionStarshipClient dict={dict} />}
    </WithDictionary>
  );
}