import { useState, useEffect } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const STORAGE_KEY = 'hvl_christmas_modal_2024_closed';

function ChristmasModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const wasClosed = localStorage.getItem(STORAGE_KEY);
        if (!wasClosed) {
            setOpen(true);
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem(STORAGE_KEY, 'true');
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        background: 'linear-gradient(180deg, #1a472a 0%, #2d5a3f 50%, #1a472a 100%)',
                        border: '4px solid #c41e3a',
                        borderRadius: '0px',
                        boxShadow: '8px 8px 0 #0d1b21',
                        overflow: 'visible',
                    }
                }
            }}
        >
            <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: -16,
                    top: -16,
                    backgroundColor: '#c41e3a',
                    color: 'white',
                    border: '3px solid #ffd700',
                    borderRadius: '0px',
                    '&:hover': {
                        backgroundColor: '#a01830',
                    },
                    zIndex: 1,
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ padding: '2rem', textAlign: 'center' }}>
                {/* Christmas Tree made with CSS/emoji */}
                <div className="text-6xl mb-4 animate-pulse">
                    <span className="drop-shadow-[0_0_10px_#ffd700]">&#127876;</span>
                </div>

                {/* Snow decoration */}
                <div className="text-2xl mb-2 opacity-80">
                    &#10052; &#10052; &#10052;
                </div>

                {/* Main greeting */}
                <h2
                    className="font-['Press_Start_2P'] text-lg md:text-xl text-[#ffd700] mb-4 leading-relaxed"
                    style={{ textShadow: '2px 2px 0 #c41e3a' }}
                >
                    Merry Christmas!
                </h2>

                <h3
                    className="font-['Press_Start_2P'] text-sm md:text-base text-white mb-6 leading-relaxed"
                    style={{ textShadow: '1px 1px 0 #1a472a' }}
                >
                    Frohe Weihnachten!
                </h3>

                {/* Christmas decorations */}
                <div className="text-3xl mb-4 flex justify-center gap-4">
                    <span>&#127873;</span>
                    <span>&#127877;</span>
                    <span>&#127873;</span>
                </div>

                {/* Message */}
                <p className="text-white text-sm mb-6 leading-relaxed">
                    Das Havelland Tech Community Team wünscht euch frohe Festtage und einen guten Rutsch ins neue Jahr!
                </p>

                {/* Stars decoration */}
                <div className="text-xl opacity-60">
                    &#10024; &#10024; &#10024; &#10024; &#10024;
                </div>

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="mt-6 font-['Press_Start_2P'] bg-[#c41e3a] text-white border-4 border-[#ffd700] px-6 py-3 text-xs cursor-pointer shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1"
                >
                    &#10052; Danke! &#10052;
                </button>
            </DialogContent>
        </Dialog>
    );
}

export default ChristmasModal;