import WithDictionary from '../../components/WithDictionary';
import TerraformingMarsClient from './TerraformingMarsClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <TerraformingMarsClient dict={dict} />}
    </WithDictionary>
  );
}