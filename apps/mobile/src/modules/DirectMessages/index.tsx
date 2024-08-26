import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useStyles } from '../../hooks';
import { ConversationType} from '../../types/messages';
import { conversationsData } from '../../utils/dummyData';
import stylesheet from './styles';
import { Chat } from '../../components/PrivateMessages/Chat';
import { Conversation as ConversationPreview, Input } from '../../components';
import { FormPrivateMessage } from '../../components/PrivateMessages/FormPrivateMessage';
import { useMyGiftWrapMessages } from 'afk_nostr_sdk';

export const DirectMessages: React.FC = () => {

  const styles = useStyles(stylesheet);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);

  const giftMessage = useMyGiftWrapMessages()
  useEffect(() => {
    // Fetch the list of messages
    // const { conversationsData } = useGetMessages();
    setConversations(conversationsData);
  }, []);

  const handleGoBack = () => {
    setSelectedConversation(null);
  };

  return (
    <>

      <FormPrivateMessage></FormPrivateMessage>


      {selectedConversation ? <Chat conversation={selectedConversation} handleGoBack={handleGoBack} />
        : (
          <View style={styles.container}>
            <FlatList
              data={conversations}
              keyExtractor={(conversation) => conversation.id}
              renderItem={({ item }) => (
                <ConversationPreview conversation={item} onPressed={() => setSelectedConversation(item)} />
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}

      <FlatList
        data={giftMessage?.data?.pages?.flat()}
        keyExtractor={(conversation) => conversation.id}
        renderItem={({ item }) =>  {

            console.log("item",item)
            return(
              <ConversationPreview conversation={item} onPressed={() => setSelectedConversation(item)} />

            )
          }
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </>

  );
};