import WithDictionary from '../../components/WithDictionary';
import AiSpacesClient from './AiSpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <AiSpacesClient dict={dict} />}
    </WithDictionary>
  );
}