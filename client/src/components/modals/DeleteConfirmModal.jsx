import { X, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-paper rounded-2xl w-full max-w-[420px] shadow-[0_40px_80px_-30px_rgba(28,27,25,0.4)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C1B19]/[0.06]">
                    <h2 className="font-display text-xl font-semibold text-ink">{title || 'Delete Post'}</h2>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full hover:bg-cream-deep flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-ink-soft" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-rust/10 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-rust" />
                        </div>
                        <div>
                            <h3 className="font-display text-lg font-semibold text-ink">Are you sure?</h3>
                            <p className="text-sm text-ink-soft mt-1">
                                {message || 'This action cannot be undone. This post will be permanently deleted.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1C1B19]/[0.06] bg-cream-deep/30">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-semibold text-ink-soft hover:text-ink bg-cream-deep hover:bg-cream-deep/70 rounded-pill transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-5 py-2.5 text-sm font-semibold text-cream bg-rust hover:bg-rust/90 rounded-pill transition-all shadow-[0_8px_0_0_#8B3A1A] active:translate-y-1 active:shadow-[0_4px_0_0_#8B3A1A]"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;