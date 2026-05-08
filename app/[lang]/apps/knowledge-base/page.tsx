import WithDictionary from '../../components/WithDictionary';
import KnowledgeBaseClient from './KnowledgeBaseClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <KnowledgeBaseClient dict={dict} />}
    </WithDictionary>
  );
}