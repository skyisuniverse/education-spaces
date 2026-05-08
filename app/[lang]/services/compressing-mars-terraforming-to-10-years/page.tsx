import WithDictionary from '../../components/WithDictionary';
import CompressingMarsTerraformingClient from './CompressingMarsTerraformingClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <CompressingMarsTerraformingClient dict={dict} />}
    </WithDictionary>
  );
}