import ContactItem from './ContactItem';

const ContactList = ({ contacts, activeContact, setActiveContact }) => {
  return (
    <div className="border-r border-[#1C1B19]/[0.1] p-4 flex flex-col h-full">
      {/* ✅ Only "Messages" text - no plus icon */}
      <div className="font-display text-lg font-bold text-ink mb-4 px-1">
        Messages
      </div>
      <div className="flex-1 overflow-y-auto space-y-1">
        {contacts.length === 0 ? (
          <div className="text-center py-8 text-ink-soft text-sm">
            No conversations yet
          </div>
        ) : (
          contacts.map((contact, index) => (
            <ContactItem
              key={contact._id || index}
              contact={contact}
              isActive={activeContact === index}
              onClick={() => setActiveContact(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;