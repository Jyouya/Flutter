class ReplyForm {
    constructor(selector) {
        this.replyToNode = $(selector);
        this.node = $(
            `<div class="new-post-container p-3 bd-bottom hover-fade">
                <div class="avatar-container">
                    <img src="/" alt="" onerror="this.src='/images/blank-avatar.jpg';" />
                </div>
                <form class="new-post-data-container pl-3">
                    <textarea type="text" name="content" placeholder="🤔🧠❓" class="new-post-input-field no-scrollbar mb-2"></textarea>
                    <button type="submit" class="button button-special" disabled>Submit</button>
                </form>
                <a class="close-reply">X</a>
            </div>`);

        this.replyToNode.after(this.node);
        this.form = this.node.find('form');

        // Arrow functions to keep this bound when we use them as callbacks
        this.close = () => this.node.remove();
        this.send = async (event) => {
            event.preventDefault();
            console.log(this.form.serialize());
            const formData = {...$(this.form).serialize(), replyId: this.replyToNode.attr('data-post-id')};
            console.log(formData);
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
        this.node.find('textarea').on('input',function() {
            console.log($(this).val());
            if (validate($(this).val())) {
                submitButton.prop('disabled', false);
            } else {
                submitButton.prop('disabled', true);
            }
        })


        this.form.submit(this.send);
        this.node.children('.close-reply').click(this.close)
    }
}