let data = null;

// Gets user's profile data
me.then(user => {
    data = user;
})

class ReplyForm {
    constructor(selector) {
        if (ReplyForm.openForms[selector]) {
            for (let k in ReplyForm.openForms[selector]) {
                this.k = ReplyForm.openForms[selector].k;
            }
            return;
        }
        this.selector = selector;
        this.replyToNode = $(selector);
        // const replyToNode = this.replyToNode;
        this.node = $(
            `<div class="new-post-container p-3 bd-bottom hover-fade">
                <div class="avatar-container">
                    <img src="${data.avatarImg}" alt="" onerror="this.src='/images/blank-avatar.jpg';" />
                </div>
                <form class="new-post-data-container pl-3">
                    <div class="text-fine mb-1" style="text-align: left;" >Write your reply...</div>
                    <textarea type="text" name="content" placeholder="🤔🧠❓" class="new-post-input-field no-scrollbar mb-2"></textarea>
                    <button type="submit" class="button button-special" disabled>Submit</button>
                </form>
                <a class="close-reply ml-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11.502" height="11.738" viewBox="0 0 11.502 11.738">
                        <path id="Union_9" data-name="Union 9" d="M5.7,11.591,1.317,15.974,0,14.657l4.5-4.5L0,5.657,1.274,4.382,5.8,8.911l4.382-4.382L11.5,5.845,7,10.345l4.5,4.5L10.228,16.12Z" transform="translate(0 -4.382)" fill="#fff"/>
                    </svg>
                </a>
            </div>`);

        this.replyToNode.after(this.node);
        this.form = this.node.find('form');

        // Arrow function to keep this bound when we use them as callbacks
        this.close = () => {
            this.node.remove();
            delete ReplyForm.openForms[this.selector];
        };

        this.send = async (event) => {
            event.preventDefault();
            const formData = this.form.serialize() + '&replyId=' + this.replyToNode.attr('data-post-id');
            await $.post('/api/posts', formData);
            // Refresh the page here?
            window.location.reload();
        }

        // Set the validation function once the regex loads
        let validate = () => true;
        regexPromise.then(() => {
            validate = (val) => {
                return regex.test(val);
            }
        });

        const submitButton = this.form.children('button');

        // regex validation
        this.node.find('textarea').on('input', function () {
            console.log($(this).val());
            if (validate($(this).val())) {
                submitButton.prop('disabled', false);
            } else {
                submitButton.prop('disabled', true);
            }
        })

        this.form.submit(this.send);
        this.node.children('.close-reply').click(this.close)
        ReplyForm.openForms[selector] = this;
    }
}

ReplyForm.openForms = {};
