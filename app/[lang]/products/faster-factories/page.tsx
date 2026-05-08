import WithDictionary from '../../components/WithDictionary';
import FasterFactoriesClient from './FasterFactoriesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <FasterFactoriesClient dict={dict} />}
    </WithDictionary>
  );
}