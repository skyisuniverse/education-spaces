import WithDictionary from '../../components/WithDictionary';
import ExtendedSpacesClient from './ExtendedSpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <ExtendedSpacesClient dict={dict} />}
    </WithDictionary>
  );
}