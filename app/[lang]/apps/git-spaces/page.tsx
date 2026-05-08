import WithDictionary from '../../components/WithDictionary';
import GitSpacesClient from './GitSpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <GitSpacesClient dict={dict} />}
    </WithDictionary>
  );
}